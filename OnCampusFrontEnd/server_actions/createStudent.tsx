'use server';
import POST from "./POST";
export default async function createStudent(e:
    { startId: string, endId: string }
) {
    'use server'
    console.log(e);
    const res = await POST('user/admin/createUser', e);
    return res;
};