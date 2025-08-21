'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

interface Props {
    id: string,
    name: string,
    username: string,
    imgUrl: string
}

const UserCard = ({id, name, username, imgUrl}: Props) => {

    const router = useRouter()

    const onUserClick = () => {
        router.push(`/profile/${id}`)
    }

    return (
        <article className="user-card">
            <div className="user-card-avatar">
                <Image
                    src={imgUrl}
                    alt="user avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                />
            </div>
            <div className="flex-1 text-ellipsis">
                <h4 className="text-base-semibold text-light-1">{name}</h4>
                <p className="text=small-medium text-gray-1">@{username}</p>
            </div>
            <button className="user-card-btn" onClick={onUserClick}>
                View
            </button>
        </article>
    )
}

export default UserCard