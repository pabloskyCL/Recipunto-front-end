import { useToast } from "@/components/ui/toast";
import axios from "axios";
import { defineStore } from "pinia";
import { Router } from "vue-router";

export type authState = {
    authUser: authUser | null,
    authToken: string | undefined,
    authError: {} | null
}

export type RegisterUserType = {
    firstName: string,
    lastName: string,
    birthday: string,
    email: string,
    password: string,
    address: string,
    postalCode?: string
}

export type authUser = {
    first_name: string,
    last_name: string,
    postal_code?: number,
    address: string,
    email: string
}

export type LoginUserType = {
    username: string,
    password: string
}

declare module 'pinia' { export interface PiniaCustomProperties { $router: Router } }

const { toast } = useToast();

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({ authUser: null, authToken: undefined, authError: null } as authState),
    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken,
        error: (state) => state.authError,
    },
    actions: {
        async getToken() {
            await axios.get('/sanctum/csrf-cookie');
        },
        async login(form: LoginUserType) {
            // await this.getToken();
            await axios.post('http://localhost/api/login_check', form).then(
                (res) => {
                    this.authToken = res.data.token;
                    this.authUser = res.data.data;
                    this.$router.push('/').then(() => {
                        toast({
                            title: 'Sesión iniciada con exito'
                        })
                    });
                }
            ).catch(({ response }) => {
                if (response.status === 401) {
                    toast({
                        title: 'credenciales invalidas'
                    })
                }

            })
        },
        async register(form: RegisterUserType) {
            // await this.getToken();
            await axios.post('http://localhost/api/register', form).then(
                (res) => {
                    this.$router.push('/login').then(() => {
                        toast({
                            title: 'Registro exitoso',
                            description: 'Ya puedes iniciar sesión',
                            class: 'bg-teal-500'
                        })
                    });
                }
            ).catch((errors) => {
                // TODO: backend may have a error message depending on the error type
                toast({
                    title: errors.response.data.message,
                    variant: 'destructive'
                })

            })
        },
        async logout() {
            await axios.get('localhost/api/logout', {
                headers: {
                    Authorization: 'Bearer ' + this.authToken
                }
            });
            this.authToken = undefined;
            this.authUser = null;
            this.authError = null;
            this.$router.push('/login');
        },
    },
    persist: true
});