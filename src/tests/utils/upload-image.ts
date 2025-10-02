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
  const { image_url } = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
  return image_url;
}
