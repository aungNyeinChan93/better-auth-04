



export async function arjextTest({ name, email }: { name: string, email: string }) {
    return { name, email }
};

arjextTest({
    name: 'koko',
    email: 'koko@123'
})