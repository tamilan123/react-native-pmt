import * as yup from "yup";

export const resaleValidation = yup.object().shape({
  resale_price: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+(\.[0-9]{1,2})?$/, "Price must be a valid number"),

  token: yup
    .string()
    .oneOf(["pmt"], "Invalid token selection")
    .required("Token is required")
    .default("pmt"),

  is_physical_asset: yup
    .boolean()
    .required("Please specify if this is a physical asset"),

  tracking_id: yup.string().when("is_physical_asset", {
    is: true,
    then: (schema) => schema.required("Track ID is required"),
    otherwise: (schema) => schema.notRequired()
  })

  // Image validation (commented out)
  // Uncomment and adjust if handling file/image inputs
  // nft_images: yup.array()
  //   .of(
  //     yup.mixed()
  //       .test('fileSize', 'File size too large', (value) => {
  //         if (!value) return true;
  //         return value.size <= 25 * 1024 * 1024;
  //       })
  //       .test('fileType', 'Invalid file type', (value) => {
  //         if (!value) return true;
  //         const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  //         return supportedTypes.includes(value.type);
  //       })
  //   )
  //   .min(1, "At least one image is required")
});
