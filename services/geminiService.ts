
import { GoogleGenAI, Type } from "@google/genai";
import { PetProfile, FoodProduct } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFoodRecommendation = async (profile: PetProfile, availableFoods: FoodProduct[]) => {
  const prompt = `Dựa trên hồ sơ thú cưng sau đây, hãy đề xuất các loại thức ăn tốt nhất từ danh sách.
  Hồ sơ: ${JSON.stringify(profile)}
  Danh sách thức ăn: ${JSON.stringify(availableFoods)}
  Hãy đưa ra lý do chi tiết cho từng đề xuất bằng tiếng Việt.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      temperature: 0.7,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                foodId: { type: Type.STRING },
                reason: { type: Type.STRING },
                score: { type: Type.NUMBER, description: "Điểm phù hợp 0-100" }
              },
              required: ["foodId", "reason", "score"]
            }
          }
        },
        required: ["recommendations"]
      }
    }
  });

  const text = response.text?.trim();
  if (!text) {
    return { recommendations: [] };
  }
  return JSON.parse(text);
};

export const compareFoods = async (foodA: FoodProduct, foodB: FoodProduct, profile: PetProfile | null) => {
  const petContext = profile 
    ? `Bản so sánh dành cho một bé ${profile.type === 'dog' ? 'chó' : 'mèo'} tên là ${profile.name}, ${profile.age} tuổi, nặng ${profile.weight}kg, mức độ hoạt động ${profile.activityLevel}, và có các tiền sử dị ứng: ${profile.allergies.join(', ') || 'không có'}.` 
    : "Không có hồ sơ thú cưng cụ thể.";

  const prompt = `Hãy thực hiện so sánh dinh dưỡng giữa hai loại thức ăn thú cưng này.
  ${petContext}

  Thức ăn A: ${JSON.stringify(foodA)}
  Thức ăn B: ${JSON.stringify(foodB)}

  Hãy đưa ra đánh giá chi tiết bằng tiếng Việt. Phân tích cụ thể về thành phần, sự cân bằng dinh dưỡng và giá trị kinh tế. Nếu có hồ sơ thú cưng, hãy chỉ rõ loại nào tốt hơn cho bé đó và tại sao. Sử dụng giọng văn chuyên nghiệp nhưng thân thiện.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "Bạn là một chuyên gia dinh dưỡng thú y hàng đầu thế giới. Mục tiêu của bạn là giúp chủ nuôi đưa ra lựa chọn tốt nhất cho sức khỏe thú cưng của họ. LUÔN LUÔN TRẢ LỜI BẰNG TIẾNG VIỆT."
    }
  });

  return response.text || "Không thể tạo bản so sánh vào lúc này.";
};
