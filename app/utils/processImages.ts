import sharp from "sharp";

export const processImages = async (imageUrls: string[]) => {
  const images = await Promise.all(
    imageUrls.map(async (url) => {
      try {
        if (url.startsWith("data:")) return "data:image/png;base64,";
        const repsonse = await fetch(url);
        const buffer = await repsonse.arrayBuffer();
        const image = sharp(buffer);
        const { width, height } = await image.metadata();
        const safeWidth = Math.floor(width || 0);
        const safeHeight = Math.floor(height || 0);
        const squareSize = Math.min(safeWidth, safeHeight);
        const extractedImage = await image
          .extract({
            left: Math.floor((safeWidth - squareSize) / 2),
            top: Math.floor((safeHeight - squareSize) / 2),
            width: squareSize,
            height: squareSize
          })
          .toBuffer();
        const resizedImage = await sharp(extractedImage)
          .resize(120, 120)
          .png()
          .toBuffer();

        return "data:image/png;base64," + resizedImage.toString("base64");
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return "";
        {
          /* return "https://s.yimg.com/ny/api/res/1.2/zpJgEgEIHJtNCmm6FTBxBg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://media.zenfs.com/en/coindesk_75/76b14eac02234187ef0d5485201e978e"; */
        }
      }
    })
  );
  return images;
};
