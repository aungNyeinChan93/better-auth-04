"use client";

import { uploadImage } from "@/tests/utils/upload-image";
import { ChangeEvent, FormEvent, useState } from "react";
import { inspect } from "util";

export default function TestUploadImage() {
  const [file, setFile] = useState<File | null>(null);

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return null;
    }
    const [image_url, err] = await uploadImage({
      name: "players",
      file: file!,
    });
    if (err) {
      return alert(err);
    }
    alert(image_url);
  };
  return (
    <>
      <div>
        <form onSubmit={formSubmit}>
          <input
            type="file"
            name="file"
            id="file"
            placeholder="Image"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFile(e.target?.files![0] as File)
            }
          />
          {/* <image>{file && URL.createObjectURL(file)}</image> */}
          <img src={file ? URL.createObjectURL(file) : ""} alt="" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
