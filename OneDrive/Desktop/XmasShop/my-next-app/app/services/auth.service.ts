import { ReducerType } from "@reduxjs/toolkit";
import { axiosClassic } from "../api/api";
import { IAuthForm, IAuthResponse } from "../types/auth.types";
import { removeFromSrorage, saveTokenStorage } from "./AuthToken.service";

export const authService = {
  async main(
    type: "login" | "register",
    data: IAuthForm
  ): Promise<IAuthResponse> {
    console.log("Отправка на сервер:", data);

    try {
      const response = await axiosClassic.post<IAuthResponse>(
        `/auth/${type}`,
        data
      );

      console.log("Ответ от сервера:", response.data); // Логируем ответ от сервера

      if (response.data.accessToken) {
        saveTokenStorage(response.data.accessToken);
      }

      return response.data; // Возвращаем данные с типом IAuthResponse
    } catch (error) {
      console.error("Ошибка при запросе:", error);
      throw new Error("Ошибка авторизации");
    }
  },
  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>(
      "/auth/login/access-token"
    );
    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);
    return response;
  },

  async logout() {
    const response = await axiosClassic.post<boolean>("/auth/logout");
    if (response.data) removeFromSrorage();

    return response;
  },
};
