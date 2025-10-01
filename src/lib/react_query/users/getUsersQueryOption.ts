import { UsersAndArticles } from "@/app/api/users/route";
import { queryOptions } from "@tanstack/react-query";





export default function getUsersQueryOption() {

    return queryOptions({
        queryKey: ['users'],
        queryFn: getAllUsers
    })
};



export async function getAllUsers() {
    const { users }: { users: UsersAndArticles | undefined } = await fetch(`/api/users`).then(res => res.json())
    return users
}