"use client";
import { Formik } from "formik";
import * as yup from "yup";

interface IProductSaveProps {}

const FILE_SIZE = 1024 * 1024 * 10;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const schema = yup.object({
  name: yup.string().required(),
  promotionalMessage: yup.string(),
  value: yup.number().required(),
  files: yup.array(
    yup
      .mixed()
      .required("A file is required")
      .test(
        "fileSize",
        "File too large",
        (value: any) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
      )
  ),
});

const ProductSave = ({}: IProductSaveProps) => {
  const submit = async (data: yup.InferType<typeof schema>) => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.promotionalMessage)
      formData.append("promotionalMessage", data.promotionalMessage);

    formData.append("value", data.value as any);

    data.files?.map((file) => formData.append("files", file as any));

    try {
      const response = await fetch("/api/product/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Files uploaded successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        validationSchema={schema}
        initialValues={
          {
            name: "",
            value: 0,
            files: [],
            promotionalMessage: "",
          } as yup.InferType<typeof schema>
        }
        onSubmit={submit}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          setFieldValue,
          submitForm,
        }) => (
          <div>
            <div>{JSON.stringify(errors)}</div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
              />
              {errors.name && <div>{errors.name}</div>}
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.promotionalMessage}
                name="promotionalMessage"
              />
              {errors.promotionalMessage && (
                <div>{errors.promotionalMessage}</div>
              )}
            </div>
            <div>
              <input
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.value}
                name="value"
              />
              {errors.value && <div>{errors.value}</div>}
            </div>
            <div>
              <input
                type="file"
                name="files"
                multiple
                onChange={(e) => {
                  if (!e.target.files?.length) return;

                  setFieldValue("files", Array.from(e.target.files));
                }}
              />
            </div>
            <button type="submit" onClick={submitForm}>
              Submit
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ProductSave;
