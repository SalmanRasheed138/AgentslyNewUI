import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const avatarUrl = useSelector((state: RootState) => state.userProfile.avatarUrl)

  return (
    <header>
      {/* Other header content */}
      <Avatar>
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt="Profile" />
        ) : (
          <AvatarFallback>RV</AvatarFallback>
        )}
      </Avatar>
    </header>
  )
}

