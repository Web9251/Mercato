# Image Upload and Delete functionality

## Create Product form

### Uploading Images

- Upload to uploadThing
- On Upload complete set images to form values
- if error toast the error
- Display the images

### Removing images

<!-- Images are only on uploadThing -->

- remove single image from uploadThing at a time
- disable delete functionalities of other images
  -- set deleting keys for images to spin single image icon only
  -- set banner key to spin the banner icon only
- update form values

### On Submit

- run create product form
  -- no need for deleting from uploadThing as images were deleted

## Update product form

<!-- Images are on db and uploadThing -->

### Uploading Images

- The same as before
- There is not need to store it in local states as values are stored in form values

### Removing Images

- set the removed image keys to local state
  -- setImages store as an []
  -- setBanner store as a string

### On Submit

- For create product form
  -- run create product form
  -- no need for deleting from uploadThing as images were deleted
- For update product form
  -- delete Images from uploadThing by using locally saved image keys
  -- run updateProductAction

# Comparison

- Create product form
  -- remove images from uploadThing right away
  -- useTransition
  -- use bannerKey and deleteKey for spin effect

- Update product form
  -- remove images from uploadThing onSubmit
  -- no useTransition
  -- use bannerKey and imageKeys to delete from uploadThing
