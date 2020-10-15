import React, { useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import ApiRequest from '../../util/ApiRequest';

const ConfigGroup = ({detail}) => {
    const [members, setMembers] = useState([])
    const [groupName, setGroupName] = useState()

    useEffect(()=>{
        if(members.length || !detail) return;
        detail.membersId.forEach( async member => {
                try {
                    let { data } = await ApiRequest.get(`/user/id/${member}`)
                    setMembers( members => [...members, data])
                } catch (error) {
                    console.log("Error al obtener miembros del grupo", error)
                }
            }
        )
    },[detail, members])

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
        let bodyReq = { userId: member.id }
        console.log("bodyReq:::", bodyReq)
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

    }

    const deleteGroup = async () => {
        console.log("deleteGroup")
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

            <div className="delete-group" onClick={deleteGroup}>
                <Button>Eliminar Grupo</Button>
            </div>
        </div>
    )
}

export default ConfigGroup;
