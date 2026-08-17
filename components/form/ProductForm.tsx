"use client"

import { Controller, useForm } from "react-hook-form"
import TextInput from "../form/TextInput"
import TextareaInput from "../form/TextareaInput"
import SubmitButton from "../form/SubmitButton"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Button } from "../ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "@/utils/schemas"
import { Banner, productFields, UploadImage } from "@/utils/types"
import { Input } from "../ui/input"
import { useState, useTransition } from "react"
import { UploadButton } from "@/lib/uploadthing"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"
import { toast } from "sonner"
import { Checkbox } from "../ui/checkbox"
import {
  createProductAction,
  editProductAction,
} from "@/actions/productActions"
import { X } from "lucide-react"
import { generateSlug } from "@/utils/utils"
import { deleteUploadthingFiles } from "@/lib/delete-uploadthing-files"
import { createProductDefaultValues } from "@/utils/constants"
import { Spinner2 } from "../ui/spinner"
import SuperJSON from "superjson"
import { Product } from "@/generated/prisma/client"

function ProductForm({ productStr }: { productStr?: string }) {
  const product = productStr ? SuperJSON.parse<Product>(productStr) : null

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<productFields>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          category: product.category,
          brand: product.brand,
          price: product.price,
          stock: product.stock,
          images: product.images as UploadImage[],
          isFeatured: product.isFeatured,
          description: product.description,
          slug: product.slug,
          banner: product.banner as Banner,
        }
      : createProductDefaultValues,
  })

  const imagesWatch = watch("images")
  const isFeaturedWatch = watch("isFeatured")
  const bannerWatch = watch("banner")
  const nameWatch = watch("name")

  const btnClass = !isFeaturedWatch
    ? "hidden"
    : isFeaturedWatch && bannerWatch
      ? "hidden"
      : "block"
  const bannerClass = isFeaturedWatch ? "block" : "hidden"

  const [imageKeys, setImageKeys] = useState<string[]>([])
  const [bannerKey, setBannerKey] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const [deletingKey, setDeletingKey] = useState<string>()

  const handleDelete = async (key: string, type: "image" | "banner") => {
    if (product) {
      if (type === "banner") {
        setValue("banner", undefined)
      }
      setImageKeys([...imageKeys, key])
      const currentImages: UploadImage[] = getValues("images") || []
      const filteredImages = currentImages
        ? currentImages.filter((i) => i.key !== key)
        : []
      setValue("images", [...filteredImages])
    } else {
      startTransition(async () => {
        try {
          await deleteUploadthingFiles(key)
        } catch (error) {
          toast.error("Failed to delete image")
          return
        }
        if (type === "banner") {
          setValue("banner", undefined)
          toast.success("Banner removed")
          return
        } else {
          const currentImages: UploadImage[] = getValues("images") || []

          const filteredImages = currentImages
            ? currentImages.filter((i) => i.key !== key)
            : []
          setValue("images", [...filteredImages])
          toast.success("Image removed")
          return
        }
      })
    }
  }

  const submitHandler = async (formData: productFields) => {
    if (product) {
      try {
        await deleteUploadthingFiles(bannerKey, imageKeys)
      } catch {
        toast.error("Failed to delete image. Product not updated")
        return
      }

      const result = await editProductAction(product.slug, formData)
      if (!result.success) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
    } else {
      const result = await createProductAction(formData)
      if (!result.success) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup>
        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name" className="capitalize">
                    name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    className="dark:bg-transparent focus:bg-transparent"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )
            }}
          />

          <div>
            <TextInput control={control} name="slug" />
            <Button
              type="button"
              className="mt-3"
              onClick={() => generateSlug(nameWatch, setValue, "slug")}
            >
              Generate
            </Button>
          </div>

          <TextInput control={control} name="category" />

          <TextInput control={control} name="brand" placeholder="Enter brand" />

          <TextInput control={control} name="price" type="number" />

          <TextInput control={control} name="stock" type="number" />
        </div>

        <Controller
          name="images"
          control={control}
          render={({ fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Images</FieldLabel>
                <Card className="dark:bg-transparent">
                  <CardContent className="space-y-2 mt- min-h-48">
                    <div className="flex space-x-2 ">
                      {imagesWatch &&
                        imagesWatch.map((image) => {
                          return (
                            <div key={image.key} className="relative">
                              <Image
                                src={image.url}
                                alt="product image"
                                className="size-24 object-cover object-center rounded-sm"
                                sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw "
                                unoptimized
                                width={100}
                                height={100}
                              />
                              <Button
                                size="icon-xs"
                                className="absolute top-0 right-0 bg-red-900 text-white"
                                type="button"
                                onClick={() => {
                                  setDeletingKey(image.key)
                                  handleDelete(image.key, "image")
                                }}
                                disabled={isPending}
                              >
                                {isPending && deletingKey === image.key ? (
                                  <Spinner2 />
                                ) : (
                                  <X />
                                )}
                              </Button>
                            </div>
                          )
                        })}
                    </div>

                    <div className="flex">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(
                          res: {
                            ufsUrl: string
                            key: string
                            name: string
                            size: number
                          }[]
                        ) => {
                          setValue("images", [
                            ...imagesWatch,
                            {
                              key: res[0].key,
                              url: res[0].ufsUrl,
                              name: res[0].name,
                              size: res[0].size,
                            },
                          ])
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`ERROR! ${error.message}`)
                        }}
                        className="ut-button:ring-0 ut-button:outline-black ut-button:bg-primary ut-button:font-sans ut-button:font-semibold ut-button:text-secondary ut-button:border-none ut-button:outline-none"
                      />
                    </div>
                  </CardContent>
                </Card>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />

        <Card className="dark:bg-transparent">
          <CardContent>
            <Controller
              name="isFeatured"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                    className=" flex flex-col"
                  >
                    <div className="flex gap-2 justify-center items-center self-start">
                      <Checkbox
                        id="featured"
                        aria-invalid={fieldState.invalid}
                        onCheckedChange={(checked) => {
                          if (product && !checked) {
                            setBannerKey(bannerWatch?.key ?? "")
                          }
                          field.onChange(checked)
                        }}
                        checked={isFeaturedWatch}
                      />
                      <FieldLabel htmlFor="featured" className="capitalize">
                        featured
                      </FieldLabel>
                    </div>
                    <div>
                      {bannerWatch && (
                        <div className="relative overflow-hidden">
                          <Image
                            src={bannerWatch.url}
                            alt="product banner"
                            height={100}
                            width={100}
                            unoptimized
                            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw "
                            className={`size-60 object-cover object-center rounded-sm ${bannerClass}`}
                          />
                          <Button
                            size="icon-xs"
                            className="absolute top-0 right-0 bg-red-900 text-white"
                            type="button"
                            onClick={() => {
                              setBannerKey(bannerWatch.key)
                              handleDelete(bannerWatch.key, "banner")
                            }}
                            disabled={isPending}
                          >
                            {isPending && bannerKey ? <Spinner2 /> : <X />}
                          </Button>
                        </div>
                      )}

                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(
                          res: { ufsUrl: string; key: string }[]
                        ) => {
                          setValue("banner", {
                            url: res[0].ufsUrl,
                            key: res[0].key,
                          })
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`ERROR! ${error.message}`)
                        }}
                        className={`${btnClass} ut-button:ring-0 ut-button:outline-black ut-button:bg-primary ut-button:font-sans ut-button:font-semibold ut-button:text-secondary ut-button:border-none ut-button:outline-none`}
                      />
                    </div>
                  </Field>
                )
              }}
            />
          </CardContent>
        </Card>

        <TextareaInput control={control} name="description" />

        <SubmitButton
          text={`${product ? "update product" : "create product"}`}
          loadingText={`${product ? "updating product..." : "creating product..."}`}
          isSubmitting={isSubmitting}
          className="py-6"
        />
      </FieldGroup>
    </form>
  )
}
export default ProductForm
