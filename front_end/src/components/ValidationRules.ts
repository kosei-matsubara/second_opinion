type ValidationRule = {
  required?: string
  maxLength?: {
    value: number
    message: string
  }
  pattern?: {
    value: RegExp
    message: string
  }
}

type ValidationRules = {
  [key: string]: ValidationRule
}

export const validationRules: ValidationRules = {
  email: {
    required: 'メールアドレスを入力してください',
    pattern: {
      value:
        /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
      message: 'メールアドレス形式を入力してください。',
    },
  },
  password: {
    required: 'パスワードを入力してください',
  },
  name: {
    required: '名前を入力してください',
  },
  categories: {
    required: '相談カテゴリは必須入力です',
  },
  title: {
    required: '相談タイトルは必須入力です',
    maxLength: {
      value: 50,
      message: '相談タイトルは50文字以内で入力してください',
    },
  },
  background: {
    required: '相談の背景は必須入力です',
    maxLength: {
      value: 600,
      message: '相談の背景は600文字以内で入力してください',
    },
  },
  articleContent: {
    required: '質問は必須入力です',
    maxLength: {
      value: 100,
      message: '質問は100文字以内で入力してください',
    },
  },
  selfIntroduction: {
    maxLength: {
      value: 600,
      message: '自己紹介は600文字以内で入力してください',
    },
  },
  myStrength: {
    maxLength: {
      value: 600,
      message: 'わたしの強みは600文字以内で入力してください',
    },
  },
  career: {
    maxLength: {
      value: 400,
      message: '経歴は400文字以内で入力してください',
    },
  },
  message: {
    maxLength: {
      value: 400,
      message: '相談者へのメッセージは400文字以内で入力してください',
    },
  },
  access: {
    maxLength: {
      value: 400,
      message: 'アクセスは400文字以内で入力してください',
    },
  },
  website: {
    maxLength: {
      value: 80,
      message: '弊社ホームページは80文字以内で入力してください',
    },
  },
  answerContent: {
    required: '回答は必須入力です',
    maxLength: {
      value: 600,
      message: '回答は600文字以内で入力してください',
    },
  },
}
