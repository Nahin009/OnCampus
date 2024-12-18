'use server'
import POST from './POST';
async function updateProfile(e:
    { data: {}, type: string }
) {
    console.log(e);
    const res = await POST('user/updateProfile', e);
    return res;
};

async function updateRole(e:
    { email: string, prevRole: string, newRole: string }) {
    console.log(e);
    const res = await POST('user/admin/updateRole', e);
    return res;
}

async function updatePassword(e:
    { previousPassword: string, newPassword: string }) {
    console.log(e);
    const res = await POST('user/updatePassword', e);
    return res;
}

export { updateProfile, updateRole, updatePassword };