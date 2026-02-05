// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardAction,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// export function ProductCard({product}) {
  
//   return (
//     <Card className="relative mx-auto w-full max-w-sm pt-0">
//       <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
//       <img
//         src={product.image}
//         alt="Event cover"
//         className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
//       />
//       <CardHeader>
//         <CardAction>
//           <Badge variant="secondary">{product.name}</Badge>
//         </CardAction>
//         <CardTitle>{product.description}</CardTitle>
//         <CardDescription>
//           produsdf kfjdh 
//         </CardDescription>
//       </CardHeader>
//       <CardFooter>
//         <Button className="w-full">View Event</Button>
//       </CardFooter>
//     </Card>
//   )
// }


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import EditButton from "@/app/dashboard/products/components/EditButton"
import DeleteButton from "@/app/dashboard/products/components/DeleteButton"

export function ProductCard({ product, refetch }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

      <img
        src={product.image}
        alt={product.name}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
      />

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{product.name}</Badge>
        </CardAction>

        <CardTitle>{product.description}</CardTitle>

        <CardDescription>
          Price: ৳{product.price}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <EditButton id={product.id} />
        <DeleteButton id={product.id} onSuccess={refetch} />
      </CardFooter>
    </Card>
  )
}
