import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Form, notification } from 'antd';
import Auth from '../../util/Auth';
import ApiRequest from '../../util/ApiRequest';
import ContentWrapper from '../../components/ContentWrapper';
import CustomizedForm from '../../components/CustomizedForm';
import userFields from '../../forms/POST_USER'

const usePostUser = bodyReq => {
	const [ user, setUser ] = useState(null)
	useEffect(() => {
		if (bodyReq){
			let asyncAuth = new Promise ( async (res, rej) => {
				try {
					let user = await Auth.signUp( bodyReq.userNickname, bodyReq.userPassword, bodyReq.userEmail )
					res(user)
				}catch(e){
					rej(e)
				}
			})
			let asyncPost = async () => {
				try{
					delete bodyReq.userConfirmPassword;
					delete bodyReq.userConfirmEmail;
					let ok = await ApiRequest.post("/user", bodyReq);
					setUser(ok)
				}catch(e){
					notification.error({
						message: 'Error al almacenar usuario ',
						description: `Api Error: ${e.message}`,
						placement: 'bottomLeft'
					});
				}
			}
			asyncAuth.then( user => {
				asyncPost()
			}).catch( e => {
				notification.error({
					message: 'Error al crear usuario ',
					description: `Cognito: ${e.message}`,
					placement: 'bottomLeft'
				});
			})
		}
	}, [bodyReq])
	return [user];
}

const SignIn = () => {
	const [ fields, setFields ] = useState(null)
	const history = useHistory();
	const [ form ] = Form.useForm();
	const [ user ] = usePostUser(fields)
	
	useEffect( () => {
		if(user){
			notification.success({
				message: `Usuario registrado`,
				placement: 'bottomLeft'
			});
			history.push('/');
		}
	},[user, history])

	return (
		<ContentWrapper topNav footer>
			<CustomizedForm form={form} data={userFields} onfinish={setFields} />
		</ContentWrapper>
	);

};

export default SignIn;
