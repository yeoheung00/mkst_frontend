'use client'

import { Comment } from '@/types'

export default function CommentSection({initialComments}: {initialComments: Comment[]}) {
  return (
    <div>

    </div>
  )
}

// async function CommentForm() {
//   const session = await auth();
//   return (
//     <form className="w-full flex flex-col gap-2">
//       {session ?
//         <div className="flex flex-row gap-2 items-center">
//           <Image width={32} height={32} sizes="32px" alt="" src={session.user.image ?? ""} className="rounded-full border border-border-default"/>
//           <span className="">{session.user.name ?? ""}</span>
//         </div> :
//         <div className="flex flex-row gap-8 items-center">
//           <Input id="name" label="이름" type="text" size="sm" containerClassName="w-16" fullWidth={false} className="w-16" />
//           <Input id="password" label="비밀번호" type="text" size="sm" containerClassName="w-16" fullWidth={false} className="w-16"/>
//         </div>}
//       <div className="flex flex-row gap-2 items-end">
//         <Textarea id="comment" placeholder="욕설금지" className="h-16 flex-1" />
//         <Button variant="primary" className="shrink-0 h-16 w-16 text-on-primary rounded-md"><Send/></Button>
//       </div>
//     </form>
//   )
// }
