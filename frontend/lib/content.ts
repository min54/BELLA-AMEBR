import type { Language } from "@/lib/api";

export type LocalizedContent = {
  title: string;
  subtitle: string;
  trustLabel: string;
  trust: string;
  doctorLabel: string;
  doctor: string;
  benefitsTitle: string;
  benefits: string[];
  benefitsNote: string;
  requirementsTitle: string;
  requirements: string[];
  galleryTitle: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  formTitle: string;
  formName: string;
  formNamePlaceholder: string;
  formSns: string;
  formSnsPlaceholder: string;
  formReason: string;
  formReasonPlaceholder: string;
  formSubmit: string;
  formSubmitting: string;
  formSuccessTitle: string;
  formSuccessBody: string;
  formErrorTitle: string;
  formErrorBody: string;
  validationName: string;
  validationSns: string;
  validationReason: string;
  lineContact: string;
  footer: string;
};

export const content: Record<Language, LocalizedContent> = {
  KR: {
    title: "[Official] 2026 벨라 코리아 클리닉 앰배서더 모집",
    subtitle: "한국 거주 일본인을 위한 프리미엄 뷰티 저니",
    trustLabel: "Hongdae, Seoul",
    trust:
      "홍대에 자리한 벨라 코리아 클리닉은 이미 해외 인플루언서들의 발길이 이어지는 곳입니다. SNS 트렌드에 민감한 크리에이터들이 먼저 선택한 시술 퀄리티를, 앰배서더로서 직접 경험하실 수 있습니다.",
    doctorLabel: "원장 직접 일본어 상담",
    doctor:
      "통역을 거치지 않고 원장님이 직접 일본어로 진료와 상담을 진행합니다. 섬세한 피부 고민과 시술 뉘앙스까지 정확하게 전달하실 수 있습니다.",
    benefitsTitle: "활동 혜택 (Benefits)",
    benefits: [
      "프리미엄 시술 연간권 지원 (1년)",
      "3개월마다 정기적인 맞춤형 피부 관리",
      "전문의 1:1 퍼스널 컨설팅",
      "콘텐츠 제작 지원금 지급",
    ],
    benefitsNote:
      "자세한 혜택 내역 및 지원금 규모는 개별 문의를 통해 안내드립니다.",
    requirementsTitle: "지원 자격 (Requirements)",
    requirements: [
      "한국에 거주 중인 일본인 (비자 종류 무관)",
      "기본적인 한국어 커뮤니케이션이 가능하신 분 (유창하지 않아도 OK)",
      "SNS(인스타그램, 틱톡 등) 활동이 활발하신 분",
      "뷰티와 자기관리에 관심이 많으신 분",
      "정기적인 방문이 가능하신 분 (3개월 1번 가량)",
    ],
    galleryTitle: "클리닉 미리보기",
    faqTitle: "자주 묻는 질문",
    faqs: [
      {
        q: "한국어가 서툰데 괜찮나요?",
        a: "네, 원장님께서 직접 일본어로 소통하시기 때문에 통역을 거치지 않고도 편안하게 상담과 진료를 받으실 수 있습니다.",
      },
      {
        q: "시술 비용이 정말 무료인가요?",
        a: "앰배서더로 선정되시면 1년간의 정기 관리 비용은 전액 병원에서 지원합니다.",
      },
      {
        q: "활동 기간은 어떻게 되나요?",
        a: "선정 후 1년 동안 활동하게 되며, 3개월마다 방문하여 관리를 받게 됩니다.",
      },
    ],
    formTitle: "지원하기",
    formName: "성함",
    formNamePlaceholder: "홍길동",
    formSns: "SNS 계정 (Instagram/TikTok)",
    formSnsPlaceholder: "@username",
    formReason: "지원 동기",
    formReasonPlaceholder: "간단히 자기소개와 지원 동기를 적어주세요.",
    formSubmit: "지원서 제출하기",
    formSubmitting: "제출 중...",
    formSuccessTitle: "지원이 접수되었습니다",
    formSuccessBody: "검토 후 담당자가 개별적으로 연락드리겠습니다.",
    formErrorTitle: "제출에 실패했습니다",
    formErrorBody: "잠시 후 다시 시도해 주세요.",
    validationName: "성함을 입력해 주세요.",
    validationSns: "SNS 계정을 입력해 주세요.",
    validationReason: "지원 동기를 10자 이상 입력해 주세요.",
    lineContact: "LINE으로 문의하기",
    footer: "© 2026 Bella Korea Clinic. All rights reserved.",
  },
  JP: {
    title: "[Official] 2026 Bella Korea Clinic アンバサダー募集",
    subtitle: "在韓日本人のためのプレミアムビューティージャーニー",
    trustLabel: "Hongdae, Seoul",
    trust:
      "ソウル・弘大（ホンデ）に位置するBella Korea Clinicは、海外インフルエンサーの来院が続くクリニックです。SNSトレンドに敏感なクリエイターが先に選ぶ施術クオリティを、アンバサダーとして直接ご体験いただけます。",
    doctorLabel: "院長による日本語診療",
    doctor:
      "通訳を介さず、院長が直接日本語でカウンセリングと施術を行います。細やかなお肌のお悩みや施術のニュアンスまで、安心してお伝えいただけます。",
    benefitsTitle: "活動特典 (Benefits)",
    benefits: [
      "プレミアム施術の年間パス支給（1年間）",
      "3ヶ月ごとの定期パーソナライズド肌ケア",
      "専門医による1:1パーソナルコンサルティング",
      "コンテンツ制作支援金の支給",
    ],
    benefitsNote:
      "特典の詳細や支援金額については、個別にお問い合わせいただいた際にご案内いたします。",
    requirementsTitle: "応募資格 (Requirements)",
    requirements: [
      "韓国にお住まいの日本人（ビザ種別不問）",
      "簡単な韓国語でのコミュニケーションが可能な方（流暢でなくてOK）",
      "SNS（Instagram、TikTokなど）での活動が活発な方",
      "美容とセルフケアに関心が高い方",
      "定期的にご来院いただける方",
    ],
    galleryTitle: "クリニックプレビュー",
    faqTitle: "よくある質問",
    faqs: [
      {
        q: "韓国語が苦手ですが大丈夫ですか？",
        a: "はい、院長が直接日本語でご対応いたしますので、通訳を介さずに安心してカウンセリングや施術をお受けいただけます。",
      },
      {
        q: "施術費用は本当に無料ですか？",
        a: "アンバサダーに選定されると、1年間の定期管理費用は全額クリニックが負担します。",
      },
      {
        q: "活動期間はどのくらいですか？",
        a: "選定後1年間活動していただき、3ヶ月ごとにご来院いただいて施術を受けていただきます。",
      },
    ],
    formTitle: "応募する",
    formName: "お名前",
    formNamePlaceholder: "山田 花子",
    formSns: "SNSアカウント (Instagram/TikTok)",
    formSnsPlaceholder: "@username",
    formReason: "志望動機",
    formReasonPlaceholder: "簡単な自己紹介と志望動機をお書きください。",
    formSubmit: "応募フォームを送信する",
    formSubmitting: "送信中...",
    formSuccessTitle: "ご応募を受け付けました",
    formSuccessBody: "担当者より個別にご連絡いたします。",
    formErrorTitle: "送信に失敗しました",
    formErrorBody: "しばらくしてから再度お試しください。",
    validationName: "お名前を入力してください。",
    validationSns: "SNSアカウントを入力してください。",
    validationReason: "志望動機を10文字以上入力してください。",
    lineContact: "LINEでお問い合わせ",
    footer: "© 2026 Bella Korea Clinic. All rights reserved.",
  },
};
