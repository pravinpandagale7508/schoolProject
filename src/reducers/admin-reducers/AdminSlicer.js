import { createSlice } from '@reduxjs/toolkit';
export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: {
            data: {
                session: "",
                user: {
                    adminName: "",
                    email: "",
                    firstName: "",
                    id: 0,
                    lastName: "",
                    nickName: "",
                    password: "",
                    permissions: {},
                    phone: "",
                    status: 1,
                    type: 1
                }
            }
        },
        roles: [{ id: 1, label: 'admin', name: 'ROLE_ADMIN', }, { id: 2, label: 'mod', name: 'ROLE_MODERATOR' }],
        adminList: [],
        
        imageScanData: {
            output: {
                scan_output: {
                    data: {
                        non_members_found: []
                    },
                    address: {
                        sender_address: {
                        },
                        receiver_address: {
                        },
                    },
                    courier_info: {
                    }
                }
            }
        }
    },
    reducers: {
        resetAdminState: state => {
            state.admin.data.user = {
                adminName: "",
                email: "",
                firstName: "",
                id: 0,
                lastName: "",
                nickName: "",
                password: "",
                permissions: {},
                phone: "",
                status: 1,
                type: 1
            };
            state.admin.data.session = "";
        },
        
        setAdmin: (state, { payload }) => {
            state.admin.data = payload;
        },
        setAdminUser: (state, { payload }) => {
            state.admin.data.user = payload.adminData;
            state.admin.data.session = payload.sessionId;
        },
        setAdminList: (state, { payload }) => {
            state.adminList = payload;
        },
        
    },
});
// Action creators are generated for each case reducer function
export const { setAdmin,setAdminList } =
    adminSlice.actions;

export default adminSlice.reducer;
