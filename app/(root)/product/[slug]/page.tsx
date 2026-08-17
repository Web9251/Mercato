import ReviewSection from "@/components/singleProduct/ReviewSection"
import SingleProduct from "@/components/singleProduct/SingleProduct"
import { getSingleProduct } from "@/actions/productActions"
import { currentUser } from "@/hooks/currentUser"
import { getAllReviews, getUserReview } from "@/actions/reviewAction"

async function SingleProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params

  const [singleProduct, user] = await Promise.all([
    await getSingleProduct(slug),
    await currentUser(),
  ])

  if (!singleProduct) return <h2>No product found</h2>

  const [initialReviews, userReview] = await Promise.all([
    await getAllReviews({ slug, page: 1 }),
    user ? await getUserReview(user?.id, singleProduct.id) : null,
  ])

  const productRating = Number(singleProduct.rating)

  return (
    <section>
      <SingleProduct product={singleProduct} stock={singleProduct.stock} />
      <ReviewSection
        userReview={userReview}
        initialReviews={initialReviews}
        user={user}
        productRating={productRating}
      />
    </section>
  )
}
export default SingleProductPage
