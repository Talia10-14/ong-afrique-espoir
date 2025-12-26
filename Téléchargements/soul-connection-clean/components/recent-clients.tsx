"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentClients() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivier Martin</p>
          <p className="text-sm text-muted-foreground">olivier.martin@example.com</p>
        </div>
        <div className="ml-auto font-medium">Coach: Sophie M.</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>LB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Laura Bernard</p>
          <p className="text-sm text-muted-foreground">laura.bernard@example.com</p>
        </div>
        <div className="ml-auto font-medium">Coach: Thomas D.</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jean Dupont</p>
          <p className="text-sm text-muted-foreground">jean.dupont@example.com</p>
        </div>
        <div className="ml-auto font-medium">Coach: Julie M.</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>CL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Claire Leroy</p>
          <p className="text-sm text-muted-foreground">claire.leroy@example.com</p>
        </div>
        <div className="ml-auto font-medium">Coach: Sophie M.</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Marc Rousseau</p>
          <p className="text-sm text-muted-foreground">marc.rousseau@example.com</p>
        </div>
        <div className="ml-auto font-medium">Coach: Pierre L.</div>
      </div>
    </div>
  )
}
