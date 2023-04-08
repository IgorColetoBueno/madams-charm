"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import Select from "@/components/Select";
import PhotoFromInputViewer from "@/components/photo-from-input-viewer";
import { PRODUCT_CATEGORY_LIST, PRODUCT_SIZE_LIST } from "@/models/product";
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { Formik, FormikState } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";

interface IProductAddProps {}

const FILE_SIZE = 1024 * 1024 * 10;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const INITIAL_VALUES = {
  name: "",
  value: 0,
  files: "" as any,
  buyDate: "",
  buyValue: 0,
  category: "",
  size: "",
  promotionalMessage: "",
} as yup.InferType<typeof schema>;

const schema = yup.object({
  name: yup.string().required().label("Name"),
  promotionalMessage: yup.string().label("Promotional message"),
  value: yup.number().required().label("Value").min(1),
  buyValue: yup.number().required().label("Buy value").min(1),
  buyDate: yup.string().required().label("Buy date"),
  category: yup.string().label("Category"),
  size: yup.string().label("Size"),
  files: yup.array(
    yup
      .mixed<File>()
      .required("A file is required")
      .label("Files")
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

const ProductAdd = ({}: IProductAddProps) => {
  const [apiError, setApiError] = useState<any>(null);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const submit = async (
    data: yup.InferType<typeof schema>,
    resetForm: (
      nextState?:
        | Partial<
            FormikState<{
              promotionalMessage?: string | undefined;
              category?: string | undefined;
              size?: string | undefined;
              files?: any[] | undefined;
              name: string;
              value: number;
              buyValue: number;
              buyDate: string;
            }>
          >
        | undefined
    ) => void
  ) => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.promotionalMessage)
      formData.append("promotionalMessage", data.promotionalMessage);

    formData.append("value", data.value as any);
    formData.append("size", data.size!);
    formData.append("category", data.category!);
    formData.append("buyDate", data.buyDate);
    formData.append("buyValue", data.buyValue as any);

    data.files?.map((file) => formData.append("files", file as any));

    try {
      const response = await fetch("/api/product/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setApiError(null);

      resetForm();
      alert("Succesful created");
    } catch (error) {
      setApiError(error);
    }
  };

  return (
    <div className="md:h-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 h-[1900px]">
      <Formik
        validationSchema={schema}
        initialValues={INITIAL_VALUES}
        onSubmit={(data, { resetForm }) => submit(data, resetForm)}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          setFieldValue,
          submitForm,
          touched,
          submitCount,
        }) => (
          <>
            <div className="h-full p-5 space-y-5">
              <h1 className="text-gray-50 text-4xl">Product Register</h1>

              <div className="space-y-5">
                <div>
                  <Input
                    autoComplete="off"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    name="name"
                    label="Name"
                    success={!!touched.name && !errors.name}
                    errorMessage={
                      !!touched.name && !!errors.name ? errors.name : undefined
                    }
                  />
                </div>
                <div>
                  <Input
                    autoComplete="off"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.promotionalMessage}
                    name="promotionalMessage"
                    label="Promotional Message"
                    success={
                      !!touched.promotionalMessage && !errors.promotionalMessage
                    }
                    errorMessage={
                      !!touched.promotionalMessage &&
                      !!errors.promotionalMessage
                        ? errors.promotionalMessage
                        : undefined
                    }
                  />
                </div>
                <div>
                  <Select
                    label="Category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                    success={!!touched.category && !errors.category}
                    errorMessage={
                      !!touched.category && !!errors.category
                        ? errors.category
                        : undefined
                    }
                    name="category"
                    id="category"
                  >
                    {PRODUCT_CATEGORY_LIST.map((category) => (
                      <option value={category} key={`category-${category}`}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select
                    label="Size"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.size}
                    success={!!touched.size && !errors.size}
                    errorMessage={
                      !!touched.size && !!errors.size ? errors.size : undefined
                    }
                    name="size"
                    id="size"
                  >
                    {PRODUCT_SIZE_LIST.map((size) => (
                      <option value={size} key={`size-${size}`}>
                        {size}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Input
                    success={!!touched.value && !errors.value}
                    errorMessage={
                      !!touched.value && !!errors.value
                        ? errors.value
                        : undefined
                    }
                    label="Value"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.value}
                    name="value"
                  />
                </div>
                <div>
                  <Input
                    success={!!touched.buyValue && !errors.buyValue}
                    errorMessage={
                      !!touched.buyValue && !!errors.buyValue
                        ? errors.buyValue
                        : undefined
                    }
                    label="Buy value"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.buyValue}
                    name="buyValue"
                  />
                </div>
                <div>
                  <Input
                    success={!!touched.buyDate && !errors.buyDate}
                    errorMessage={
                      !!touched.buyDate && !!errors.buyDate
                        ? errors.buyDate
                        : undefined
                    }
                    label="Buy date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.buyDate}
                    name="buyDate"
                  />
                </div>
                <div>
                  <InputFile
                    type="file"
                    name="files"
                    multiple
                    onChange={(e) => {
                      if (!e.target.files?.length) return;

                      setFieldValue("files", Array.from(e.target.files));
                    }}
                  />
                </div>
                {!!Object.values(errors).length && !!submitCount && (
                  <div>{JSON.stringify(errors, undefined, 2)}</div>
                )}
                {!!apiError && (
                  <div>{JSON.stringify(apiError, undefined, 2)}</div>
                )}
                <div className="flex justify-end gap-3">
                  <Button color="white" type="submit" onClick={handleGoBack}>
                    Go back
                  </Button>
                  <Button color="teal" type="submit" onClick={submitForm}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-teal-600 to-sky-600 grid grid-rows-3 w-full">
              {!values.files ||
                (!values.files.length && (
                  <>
                    <CurrencyDollarIcon
                      className="text-white rotate-12 m-10"
                      height={250}
                    />
                    <BriefcaseIcon
                      className="text-white -rotate-12 place-self-end m-10"
                      height={250}
                    />
                    <FireIcon
                      className="text-white rotate-12 m-10"
                      height={250}
                    />
                  </>
                ))}

              {!!values.files && !!values.files?.length && (
                <PhotoFromInputViewer
                  onRemove={(index) =>
                    setFieldValue(
                      "files",
                      values.files?.filter((q) => q !== values.files![index])
                    )
                  }
                  photos={values.files}
                />
              )}
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ProductAdd;
