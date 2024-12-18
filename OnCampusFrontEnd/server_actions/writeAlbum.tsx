'use server'
import POST from './POST';
export default async function writeAlbum(e) {
    'use server'
    const res = await POST('user/createAlbum', e);
    return res;
};