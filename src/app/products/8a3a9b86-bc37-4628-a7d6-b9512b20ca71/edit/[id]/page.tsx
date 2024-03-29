"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import InputFile from "@/components/input/InputFile";
import Select from "@/components/Select";
import {
  IProduct,
  PRODUCT_CATEGORY_LIST,
  PRODUCT_SIZE_LIST,
} from "@/models/product";
import { Formik, FormikState } from "formik";
import * as yup from "yup";
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useMemo, useRef, useState } from "react";
import PhotoFromInputViewer from "@/components/photo-from-input-viewer";
import useSWR from "swr";
import Loading from "../../../../loading";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface IProductEditProps {
  params: { id: string };
}

const FILE_SIZE = 1024 * 1024 * 10;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const schema = yup.object({
  _id: yup.string().required().label("Id"),
  name: yup.string().required().label("Nome"),
  promotionalMessage: yup.string().label("Mensagem promocional"),
  value: yup.number().required().label("Valor (R$)").min(1),
  buyValue: yup.number().required().label("Preço de compra (R$)").min(1),
  buyDate: yup.string().required().label("Data da compra"),
  category: yup.string().label("Categoria"),
  size: yup.string().label("Tamanho (Depreciado)"),
  topSize: yup.string().label("Tamanho do busto"),
  bottomSize: yup.string().label("Tamanho da cintura"),
  files: yup.array(
    yup
      .mixed<File>()
      .required("É obrigatório anexar uma foto ao menos")
      .label("Files")
      .test(
        "fileSize",
        "Arquivo muito grande",
        (value: any) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Formato não suportado",
        (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
      )
  ),
  photos: yup.array(yup.string()),
});

const ProductEdit = ({ params: { id } }: IProductEditProps) => {
  const [apiError, setApiError] = useState<any>(null);
  const { data } = useSWR<IProduct>(`/api/product/${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );
  const [initialValues, setInitialValues] = useState<
    IProduct & Partial<yup.InferType<typeof schema>> & { buyDate: string }
  >();
  const router = useRouter();

  useEffect(() => {
    if (!data) return;

    const processFileAsync = async (filePath: string) => {
      const extension = filePath.substring(filePath.lastIndexOf(".") + 1);
      const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
      let response = await fetch(filePath);
      let data = await response.blob();
      let metadata = {
        type: `image/${extension}`,
      };

      return new File([data], fileName, metadata);
    };

    const init = async () => {
      const files = await Promise.all(data.photos.map(processFileAsync));
      setInitialValues({
        ...data,
        buyDate: format(new Date(data.buyDate), "yyyy-MM-dd") as Date & string,
        files,
      });
    };

    init();
  }, [data]);

  const handleGoBack = () => {
    router.back();
  };

  const submit = async (
    data: Partial<yup.InferType<typeof schema>>,
    resetForm: () => void
  ) => {
    const formData = new FormData();

    formData.append("_id", id);
    formData.append("name", data.name!);

    if (data.promotionalMessage)
      formData.append("promotionalMessage", data.promotionalMessage);

    formData.append("value", data.value as any);
    formData.append("bottomSize", data.bottomSize!);
    formData.append("topSize", data.topSize!);
    formData.append("category", data.category!);
    formData.append("buyDate", data.buyDate!);
    formData.append("buyValue", data.buyValue as any);
    formData.append("photos", data.photos as any);
    const photosNames = initialValues?.photos.map((photo) =>
      photo.substring(photo.lastIndexOf("/") + 1)
    );

    data.files
      ?.filter(
        (file) => !photosNames?.some((photoName) => file.name === photoName)
      )
      .forEach((file) => formData.append("files", file as any));

    try {
      const response = await fetch("/api/product/edit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setApiError(null);

      resetForm();
      router.back();
    } catch (error) {
      setApiError(error);
    }
  };

  if (!initialValues) return <Loading />;

  return (
    <div className="md:h-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 h-[1900px]">
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
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
            <div className="h-full p-5 mb-5 space-y-5">
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
                    label="Nome"
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
                    label="Mensagem promocional"
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
                    label="Categoria"
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
                    disabled
                    label="Tamanho (Depreciado)"
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
                  <Select
                    label="Tamanho do busto"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.topSize}
                    success={!!touched.topSize && !errors.topSize}
                    errorMessage={
                      !!touched.topSize && !!errors.topSize
                        ? errors.topSize
                        : undefined
                    }
                    name="topSize"
                    id="topSize"
                  >
                    {PRODUCT_SIZE_LIST.map((topSize) => (
                      <option value={topSize} key={`topSize-${topSize}`}>
                        {topSize}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select
                    label="Tamanho da cintura"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bottomSize}
                    success={!!touched.bottomSize && !errors.bottomSize}
                    errorMessage={
                      !!touched.bottomSize && !!errors.bottomSize
                        ? errors.bottomSize
                        : undefined
                    }
                    name="bottomSize"
                    id="bottomSize"
                  >
                    {PRODUCT_SIZE_LIST.map((bottomSize) => (
                      <option
                        value={bottomSize}
                        key={`bottomSize-${bottomSize}`}
                      >
                        {bottomSize}
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
                    label="Valor (R$)"
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
                    label="Data da compra"
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
                        ? (errors?.buyDate as unknown as string)
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

                      setFieldValue("files", [
                        ...(values.files || []),
                        ...Array.from(e.target.files),
                      ]);
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
                    Voltar
                  </Button>
                  <Button color="teal" type="submit" onClick={submitForm}>
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-teal-600 to-sky-600 grid grid-rows-3 w-full overflow-y-auto">
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
                  onRemove={(index) => {
                    const file = values.files![index];

                    setFieldValue(
                      "photos",
                      values.photos.filter((q) => !q.includes(file.name))
                    );
                    setFieldValue(
                      "files",
                      values.files?.filter((q) => q !== values.files![index])
                    );
                  }}
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

export default ProductEdit;
