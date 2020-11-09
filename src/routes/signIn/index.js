import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, notification } from 'antd';
import Auth from '../../util/Auth';
import ApiRequest from '../../util/ApiRequest';
import User from '../../classes/User';
import ContentWrapper from '../../components/ContentWrapper';
import CustomizedForm from '../../components/CustomizedForm';
import userFields from '../../forms/POST_USER';

const usePostUser = (bodyReq) => {
	const [ responseUser, setResponseUser ] = useState(null);

	useEffect(() => {
		if (bodyReq) {
			
			let user = new User(bodyReq).mapFormToRequest();

			let asyncAuth = new Promise ( async (res, rej) => {
				try {
					let cognUser = await Auth.signUp( user.userNickname, user.userPassword, user.userEmail )
					res(cognUser)
				}catch(e){
					rej(e)
				}
			})
			let asyncPost = async () => {
				try {
					let ok = await ApiRequest.post('/user', user);
					setResponseUser(ok);
				} catch (e) {
					notification.error({
						message: 'Error al almacenar usuario ',
						description: `Api Error: ${e.message}`,
						placement: 'bottomLeft'
					});
				}
			};
			asyncAuth.then( user => {
				asyncPost();
			}).catch( e => {
				notification.error({
					message: 'Error al crear usuario ',
					placement: 'bottomLeft'
				});
			})
			}
		},[ bodyReq ]);
	return [ responseUser ];
};

const SignIn = () => {
	const [ fields, setFields ] = useState(null);
	const history = useHistory();
	const [ form ] = Form.useForm();
	const [ user ] = usePostUser(fields);

	useEffect(
		() => {
			if (user) {
				notification.success({
					message: `Usuario registrado`,
					placement: 'bottomLeft'
				});
				history.push('/');
				notification.info({
					message: "No olvides validar tu email",
					description: `Valida tu cuenta verificando tu correo ${fields?.userEmail} y comenzá a utilizar la aplicación.`,
					placement: 'bottomLeft',
					duration: 30
				});
			}
		},
		[ user, history ]
	);

	return (
		<ContentWrapper topNav footer>
			<CustomizedForm form={form} data={userFields} onfinish={setFields} />
		</ContentWrapper>
	);
};

export default SignIn;
