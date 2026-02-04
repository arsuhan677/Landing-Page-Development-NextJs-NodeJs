export async function UploadImage(file: File, folder: string) {
    const formData = new FormData()

     formData.append('file', file)
     formData.append('folder', folder)

     const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
     })

     const result = await response.json();
     if (!result.success) {
        throw new Error(result.error || "Faild to upload image")
        // throw new Error{result.error || "Faild to upload image"};
        
     }
     return result.url as string
}