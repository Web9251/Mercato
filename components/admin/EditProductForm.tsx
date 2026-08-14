// "use client"

// import { Controller, useForm } from "react-hook-form"
// import TextInput from "../form/TextInput"
// import FileInput from "../form/FileInput"
// import TextareaInput from "../form/TextareaInput"
// import SubmitButton from "../form/SubmitButton"
// import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
// import { Button } from "../ui/button"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { productSchema } from "@/utils/schemas"
// import {
//   Banner,
//   productFields,
//   SerializedProduct,
//   UploadImage,
// } from "@/utils/types"
// import { Input } from "../ui/input"
// import { useState, useTransition } from "react"
// import { UploadButton } from "@/lib/uploadthing"
// import { Card, CardContent } from "../ui/card"
// import Image from "next/image"
// import { toast } from "sonner"
// import { Checkbox } from "../ui/checkbox"
// import {
//   createProductAction,
//   editProductAction,
//   fetchAdminProductBySlug,
//   fetchSingleProductById,
//   renderError,
// } from "@/actions/productActions"
// import { useRouter } from "next/navigation"
// import { Spinner2 } from "../ui/spinner"
// import { X } from "lucide-react"
// import prisma from "@/lib/prisma"
// import { deleteUploadthingFiles } from "@/lib/delete-uploadthing-files"

// function EditProductForm({ product }: { product: SerializedProduct }) {
//   const {
//     name,
//     price,
//     brand,
//     category,
//     stock,
//     images,
//     isFeatured,
//     description,
//     slug,
//     banner,
//   } = product

//   const {
//     control,
//     formState: { isSubmitting },
//     handleSubmit,
//     setValue,
//     setValues,
//     watch,
//     getValues,
//   } = useForm<productFields>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name,
//       category,
//       brand,
//       price,
//       stock,
//       images: product.images as UploadImage[],
//       isFeatured,
//       description,
//       slug,
//       banner: product.banner as Banner,
//     },
//   })
//   const [bannerKey, setBannerKey] = useState<string>("")
//   const router = useRouter()
//   const submitHandler = async (formData: productFields) => {
//     // if image key or banner key available
//     // remove image from uploadthing
//     // if (imageKeys.length > 0 || bannerKey) {
//     try {
//       await deleteUploadthingFiles(bannerKey, imageKeys)
//     } catch (error) {
//       toast.error("Failed to delete image. Product not updated")
//       return
//     }

//     const result = await editProductAction(slug, formData)
//     if (!result.success) {
//       toast.error(result.message)
//       return
//     }
//     toast.success(result.message)
//     // router.push(result.redirectTo!)
//     router.refresh()
//   }
//   // }

//   const imagesWatch = watch("images")
//   const isFeaturedWatch = watch("isFeatured")
//   const bannerWatch = watch("banner")
//   const nameWatch = watch("name")

//   // Generate slug
//   const generateSlug = (nameValue: string) => {
//     const generatedSlug = nameValue
//       .trim()
//       .toLocaleLowerCase()
//       .split(/\s+/)
//       .join("-")
//     setValue("slug", generatedSlug)
//   }

//   const btnClass = !isFeaturedWatch
//     ? "hidden"
//     : isFeaturedWatch && bannerWatch
//       ? "hidden"
//       : "block"
//   const bannerClass = isFeaturedWatch ? "block" : "hidden"

//   const [imageKeys, setImageKeys] = useState<string[]>([])

//   const handleDelete = async (key: string, type: "image" | "banner") => {
//     if (type === "banner") {
//       // when x clicked
//       // set keys to local states
//       setBannerKey(key)
//       // setKeys()
//       // remove banner from form
//       setValue("banner", undefined)
//     }
//     // set local state
//     setImageKeys([...imageKeys, key])

//     // set images value
//     const currentImages: UploadImage[] = getValues("images") || []
//     const filteredImages = currentImages
//       ? currentImages.filter((i) => i.key !== key)
//       : []
//     setValue("images", [...filteredImages])
//   }

//   return (
//     <form onSubmit={handleSubmit(submitHandler)}>
//       <FieldGroup>
//         {/* ─── Name ─────────────────────────────────────────────────────────────── */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <Controller
//             name="name"
//             control={control}
//             render={({ field, fieldState }) => {
//               return (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="name" className="capitalize">
//                     name
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="name"
//                     type="text"
//                     aria-invalid={fieldState.invalid}
//                     className="dark:bg-transparent focus:bg-transparent"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )
//             }}
//           />
//           <div>
//             {/* ─── Slug ─────────────────────────────────────────────────────────────── */}

//             <TextInput
//               control={control}
//               name="slug"
//               // defaultValue={slug}
//             />
//             <Button
//               type="button"
//               className="mt-3"
//               onClick={() => generateSlug(nameWatch)}
//             >
//               Generate
//             </Button>
//           </div>
//           {/* Category */}
//           <TextInput control={control} name="category" />
//           {/* Brand */}
//           <TextInput control={control} name="brand" placeholder="Enter brand" />
//           {/* Price */}
//           <TextInput control={control} name="price" type="number" />
//           {/* Stock */}
//           <TextInput control={control} name="stock" type="number" />
//         </div>
//         {/* ─── Image ─────────────────────────────────────────────────────────────── */}

//         <Controller
//           name="images"
//           control={control}
//           render={({ field, fieldState }) => {
//             return (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel>Images</FieldLabel>
//                 <Card className="dark:bg-transparent">
//                   <CardContent className="space-y-2 mt- min-h-48">
//                     <div className="flex space-x-2 ">
//                       {imagesWatch &&
//                         imagesWatch.map((image) => {
//                           return (
//                             <div key={image.key} className="relative">
//                               <Image
//                                 src={image.url}
//                                 alt="product image"
//                                 className="size-24 object-cover object-center rounded-sm"
//                                 sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw "
//                                 unoptimized
//                                 width={100}
//                                 height={100}
//                               />
//                               <Button
//                                 size="icon-xs"
//                                 className="absolute top-0 right-0 bg-red-900 text-white"
//                                 type="button"
//                                 onClick={() => {
//                                   handleDelete(image.key, "image")
//                                 }}
//                               >
//                                 <X />
//                               </Button>
//                             </div>
//                           )
//                         })}
//                     </div>
//                     <div className="flex">
//                       <UploadButton
//                         endpoint="imageUploader"
//                         onClientUploadComplete={(
//                           res: {
//                             ufsUrl: string
//                             key: string
//                             name: string
//                             size: number
//                           }[]
//                         ) => {
//                           setValue("images", [
//                             ...imagesWatch,
//                             {
//                               key: res[0].key,
//                               url: res[0].ufsUrl,
//                               name: res[0].name,
//                               size: res[0].size,
//                             },
//                           ])
//                         }}
//                         onUploadError={(error: Error) => {
//                           toast.error(`ERROR! ${error.message}`)
//                         }}
//                         className="ut-button:ring-0 ut-button:outline-black ut-button:bg-primary ut-button:font-sans ut-button:font-semibold ut-button:text-secondary ut-button:border-none ut-button:outline-none"
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//                 {fieldState.invalid && (
//                   <FieldError errors={[fieldState.error]} />
//                 )}
//               </Field>
//             )
//           }}
//         />
//         {/* ─── Featured ─────────────────────────────────────────────────────────────── */}

//         <Card className="dark:bg-transparent">
//           <CardContent>
//             <Controller
//               name="isFeatured"
//               control={control}
//               render={({ field, fieldState }) => {
//                 return (
//                   <Field
//                     data-invalid={fieldState.invalid}
//                     orientation="horizontal"
//                     className=" flex flex-col"
//                   >
//                     <div className="flex gap-2 justify-center items-center self-start">
//                       <Checkbox
//                         id="featured"
//                         aria-invalid={fieldState.invalid}
//                         onCheckedChange={(checked) => {
//                           field.onChange(checked)
//                         }}
//                         checked={isFeaturedWatch}
//                       />
//                       <FieldLabel htmlFor="featured" className="capitalize">
//                         featured
//                       </FieldLabel>
//                     </div>
//                     <div>
//                       {bannerWatch && (
//                         <div className="relative overflow-hidden">
//                           <Image
//                             src={bannerWatch.url}
//                             alt="product banner"
//                             height={100}
//                             width={100}
//                             unoptimized
//                             sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw "
//                             className={`size-60 object-cover object-center rounded-sm ${bannerClass}`}
//                           />
//                           <Button
//                             size="icon-xs"
//                             className="absolute top-0 right-0 bg-red-900 text-white"
//                             type="button"
//                             onClick={() => {
//                               handleDelete(bannerWatch.key, "banner")
//                             }}
//                           >
//                             <X />
//                           </Button>
//                         </div>
//                       )}
//                       <UploadButton
//                         endpoint="imageUploader"
//                         onClientUploadComplete={(
//                           res: { ufsUrl: string; key: string }[]
//                         ) => {
//                           setValue("banner", {
//                             url: res[0].ufsUrl,
//                             key: res[0].key,
//                           })
//                         }}
//                         onUploadError={(error: Error) => {
//                           toast.error(`ERROR! ${error.message}`)
//                         }}
//                         className={`${btnClass} ut-button:ring-0 ut-button:outline-black ut-button:bg-primary ut-button:font-sans ut-button:font-semibold ut-button:text-secondary ut-button:border-none ut-button:outline-none`}
//                       />
//                     </div>
//                   </Field>
//                 )
//               }}
//             />
//           </CardContent>
//         </Card>
//         {/* ─── Description ─────────────────────────────────────────────────────────────── */}
//         <TextareaInput control={control} name="description" />
//         {/* ─── Submit Button ─────────────────────────────────────────────────────────────── */}
//         <SubmitButton
//           text="update product"
//           loadingText="updating product..."
//           isSubmitting={isSubmitting}
//           className="py-6"
//         />
//       </FieldGroup>
//     </form>
//   )
// }
// export default EditProductForm
