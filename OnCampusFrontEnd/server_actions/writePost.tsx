'use server'
import POST from './POST';
export default async function writePost(e: { title: string; content: string; postType: string; isComment: boolean; isNotify: boolean; isAnonymous: boolean; reminderCheck: boolean; reminder: string; discussionCheck: boolean; bloodCheck: boolean; tutionCheck: boolean; productCheck: boolean; techCheck: boolean; pollCheck: boolean; options: string[]}){
    'use server'
    const res = await POST('post/createPost', e);
    return res;
};