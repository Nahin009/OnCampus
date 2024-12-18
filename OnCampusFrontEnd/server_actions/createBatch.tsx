'use server'
import POST from './POST';
export default async function createBatch(e: { batch: string }) {
    'use server'
    console.log(e);
    const res = await POST('user/admin/createBatch', e);
    return res;
};