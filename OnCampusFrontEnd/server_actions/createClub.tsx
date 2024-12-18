'use server'
import POST from './POST';
export default async function createClub(e:
    { clubName: string, members: any[] }
) {
    'use server'
    console.log(e);
    const res = await POST('user/admin/createClub', e);
    return res;
};