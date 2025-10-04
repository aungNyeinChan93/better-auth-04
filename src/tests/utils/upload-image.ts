import { error } from "console";


export async function uploadImage({
  name,
  file,
}: {
  name: string;
  file?: File;
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file as File);

  let error: null | string = null;
  try {
    const { image_url, error } = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    return [image_url, error];
  } catch (error) {
    error = error instanceof Error ? error?.message : 'file upload Fail'
    return [null, error]
  }
}
