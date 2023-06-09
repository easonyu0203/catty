# 浪我遇見貓

這個網站名為「浪我遇見貓」，旨在統整關於流浪貓的正確資訊，供民眾參考。我們相信提供可靠、準確的資訊是保護流浪貓並提高流浪貓領養率的基礎，同時也是我們這次期末專案的主要主張。我們詳細解釋關於流浪貓的生活習性、健康狀況、醫療照護等各種資訊，讓公眾在對流浪貓有更完整的認識後，能做出有益於自己和貓咪的決定。此外，我們還提供引導民眾理解和走過流浪貓認養注意事項和流程的功能，希望協助有意願領養的人事先準備好相關責任，創造一個更美好的生活環境。我們的網站還設有聊天貼文討論區，讓民眾可以討論、分享並順利領養流浪貓，同時連結了「火山哥」的粉專，以協助流浪貓找到最適合的領養者並提供受傷貓咪即時治療。我們的目標是讓每一隻流浪貓都能找到一個溫暖的家，並與領養者共享無盡的愛與歡樂。

## 如何執行專案

此專案是使用 Sveltekit 製作，確保您`npm` 更新至最新版本並在此 `workspace` 則執行以下指令

```bash

npm  install
npm  run  dev

```

這會下載需要的 package 並且開啟一個 developing server

此外，您並須提供你的 OpenAI API key 至 `.env` 檔案，格式請參照 `.env.example`

依照以上步驟則能欣賞我們網站！

# Feature 介紹

這裡列出網站的主要功能特色以及詳細的描述：

1.  主頁 (Landing Page):

    - 簡潔且吸引人的首頁設計，包含簡短的標語以傳達網站的核心理念。
    - 包含一些吸引用戶注意的動畫和轉場效果，讓用戶體驗更好。
    - 利用 Server Side Rendering (SSR) 在用戶觀看動畫時提前載入後續內容，提升用戶體驗。

2.  知識庫分頁：

    - 知識庫分頁是一個資訊豐富的部分，提供用戶有關於照顧流浪貓的知識。
    - 主要分為「行為照顧」和「醫療知識」兩大區塊，涵蓋從貓咪基本照顧知識，收養貓咪的注意事項，到貓咪疾病的相關知識等。

3.  貼文牆：

    - 這個功能讓用戶可以分享關於他們的貓咪的故事和知識，增進彼此的交流和學習。
    - 這也是一個增進社群連結和互動的重要功能。

4.  AI 小幫手：

    - 利用 OpenAI API 實現，能讓用戶使用問答的方式來詢問關於流浪貓的問題，提供用戶實時的協助和解答。

5.  工具列：

    - 有 Light 和 Dark 兩種模式，可以根據用戶的偏好切換，並會自動讀取用戶的操作系統設定作為預設值。
    - 提供了關於流浪貓的 Instagram 連結，用戶可以通過此連結進一步了解和接觸到流浪貓的相關資訊。
    - 提供開源的程式碼在 Github 上，讓其他開發者可以查看並參與開發。
    - 有登入和登出功能，只有登入的用戶才能使用 AI 幫手和貼文牆功能，保護了用戶的權益和資訊安全。

# 未完成 features

我們有達成期中時所制定的 features 並且還衍生出更多！

# 技術架構

1.  前端：該網站使用的前端框架是 Sveltekit，這是一個功能齊全的框架，可支援同時開發網頁介面，SSR 以及 serverless API。
2.  UI 庫：在介面設計與動畫製作上，該網站選擇使用 Tailwind CSS 和 GSAP，前者是一個用於快速建構 UI 的工具，後者則是一個強大的 Javascript 動畫庫。
3.  後端：該網站的後端使用了 Firebase，這提供了一個完整的用戶驗證系統以及資料庫系統，使用 Firebase SDK 可以實現前後端的整合，並提供即時的數據更新。
4.  部署：該網站使用 Vercel 進行部署，這是一個能夠自動化部署、實現持續集成和持續部署（CI/CD）的平台。
5.  第三方 API：該網站整合了 OpenAI API，為用戶提供人工智能助手功能。

至於具體的功能系統架構如下：

- AI 小幫手：用戶可通過前端發送聊天請求，這些請求會被後端的 Serverless API 處理。該過程會將聊天請求記錄到資料庫（Firestore），並向 OpenAI 發送 API 請求。待收到 OpenAI API 的響應後，再將結果返回給前端。
- 貼文牆：用戶可以發布貼文、對貼文進行點讚，並即時查看其他人的貼文和點讚數。前端會直接訂閱資料庫的更新，若有任何變動會直接反映在畫面上。用戶發布貼文之前需要先進行登入，這部分由 Firebase 的 Fire Auth 處理。

# 專案心得

在這次「浪我遇見貓」的專案中，我們不只學習到了前端設計、後端結構、資料庫管理和 AI API 的使用等技術，更進一步學會了如何組織和分工以及溝通協調。這些在實際執行專案時的經驗是無法從課堂中學到的，我們都非常感謝這次的學習機會。

我們很自豪的是，「浪我遇見貓」不只是一個專案，而是我們集結了技術、知識和心力，想要對社會產生正面影響的平台。我們希望透過我們的努力，讓更多人理解流浪貓的處境，並願意為他們伸出援手。希望有朝一日，我們可以看到每一隻貓咪都有一個溫暖的家。

不過，我們也碰到了許多挑戰。從設計網站的流程、確定核心功能，到學習並應用新的技術工具，每一步都充滿了挑戰。然而，每當我們克服一項挑戰，就會有一種無比的成就感和學習的喜悅。我們也從中學會了如何面對問題，並找出有效的解決方案。

我們團隊的每一個成員都在這個過程中有所成長，並且深感慶幸我們能夠攜手合作，共同完成這樣一個有意義的專案。這不僅僅是一次學習的經驗，也是一次獨特的冒險。
