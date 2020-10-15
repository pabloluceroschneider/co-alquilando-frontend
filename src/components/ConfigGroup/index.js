import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from "../../store";
import { Input, Button, notification, Modal } from 'antd'
import { SaveOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import ApiRequest from '../../util/ApiRequest';

const { confirm } = Modal;

const ConfigGroup = ({detail}) => {
    const { state } = useContext(SessionContext);
    const [members, setMembers] = useState([])
    const [groupName, setGroupName] = useState()

    useEffect(()=>{
        if(members.length || !detail) return;
        detail.membersId.forEach( async member => {
                if (state.user.id === member) return;
                try {
                    let { data } = await ApiRequest.get(`/user/id/${member}`)
                    setMembers( members => [...members, data])
                } catch (error) {
                    console.log("Error al obtener miembros del grupo", error)
                }
            }
        )
    },[detail, members, state])

    const handleChangeName = e => {
        e.preventDefault();
        setGroupName(e.target.value);
    }

    const uploadGroupName = async () => {
        if (!groupName) return;
        let bodyReq = { name: groupName }
        try {
            await ApiRequest.put(`/group/${detail?.id}/name`, bodyReq);
            notification.success({
                message: `El nombre del grupo se actualizó con éxito`,
                placement: "bottomLeft",
            });
        } catch (error) {
            notification.error({
                message: `No se pudo actualizar nombre del grupo`,
                placement: "bottomLeft",
            });
        }
    }

    const deleteMember = async member => {
        confirm({
            title: `¿Deseas eliminar a ${member.userName} del grupo?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                let bodyReq = { userId: member.id }
                try {
                    await ApiRequest.delete(`/group/${detail?.id}/delete/member`, bodyReq);
                    notification.success({
                        message: `El miembro ${member.userName} fue eliminado con éxito`,
                        placement: "bottomLeft",
                      });
                } catch (error) {
                    notification.error({
                        message: `No se pudo eliminar a ${member.userName} del grupo.`,
                        placement: "bottomLeft",
                      });
                }
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }

    const deleteGroup = async () => {
        confirm({
            title: `¿Deseas eliminar a el grupo ${detail.name}?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                try {
                    await ApiRequest.delete(`/group/${detail?.id}/delete/member`);
                    notification.success({
                        message: `El grupo ${detail.name} se eliminó con éxito`,
                        placement: "bottomLeft",
                    });
                } catch (error) {
                    notification.error({
                        message: `No se pudo eliminar el grupo ${detail.name}.`,
                        placement: "bottomLeft",
                    });
                }
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }

    return (
        <div className="wrapper-config-group">

            <div className="section">
                <div className="title">Modificar nombre de Grupo</div>
                <div className="row">
                    <Input placeholder={detail?.name} onChange={handleChangeName} value={groupName}/>
                    <div className="save-group-name" onClick={uploadGroupName}>
                        <SaveOutlined />
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="title">Eliminar miembros</div>
                {members.length ? members.map( m => {
                    return (
                        <div className="row" key={m.id}>
                            <div className="userName">{m.userName}</div> 
                            <div className="delete-member" onClick={() => deleteMember(m)}>
                                <CloseOutlined />
                            </div>
                        </div>
                    )
                }) : null}
            </div>

            <div className="delete-group">
                <Button onClick={deleteGroup}>Eliminar Grupo</Button>
            </div>
        </div>
    )
}

export default ConfigGroup;
