# 공통 컴포넌트 사용 가이드

이 문서는 `CommonTextInput`과 `CommonSelectBox` 컴포넌트를 사용하는 방법에 대해 설명합니다.

## CommonTextInput

`CommonTextInput` 컴포넌트는 텍스트 입력 필드를 생성하는 데 사용됩니다. 이 컴포넌트는 `react-hook-form`과 함께 사용되며, 다양한 유효성 검사 규칙을 지원합니다. (총 3개의 레이아웃이 존재)

### 사용 예시

```tsx
import CommonTextInput from "@/components/common/inputs/TextInput";
import { useForm } from "react-hook-form";

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CommonTextInput
        required={true}
        name='nickname'
        label='Nickname'
        control={control}
        rules={{
          required: "닉네임은 필수 항목입니다.",
          maxLength: {
            value: 8,
            message: "닉네임은 8글자를 넘어갈 수 없습니다.",
          },
        }}
        hint='최대 8글자까지 입력 가능해요'
        layout='1button'
      />
      <button type='submit'>Submit</button>
    </form>
  );
};
```

### Props

- `name`: 필드의 이름 (필수)
- `label`: 필드의 라벨 (선택)
- `control`: `react-hook-form`의 control 객체 (필수)
- `rules`: 유효성 검사 규칙 (선택)
- `hint`: 힌트 메시지 (선택)
- `layout`: 버튼 레이아웃 옵션 (`1button` 또는 `2buttons`) (선택)
- `required`: 필수 필드 여부 (선택)

## CommonSelectBox

`CommonSelectBox` 컴포넌트는 선택 박스를 생성하는 데 사용됩니다. 이 컴포넌트는 `react-hook-form`과 함께 사용되며, 두 개의 선택 박스(기본값: `1col`)를 지원합니다.

### 사용 예시

```tsx
import CommonSelectBox from "@/components/common/inputs/SelectBox";
import { useForm } from "react-hook-form";

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CommonSelectBox
        name='country'
        label='Country'
        layout='2cols'
        control={control}
        options={[
          { value: "usa", label: "USA" },
          { value: "canada", label: "Canada" },
          { value: "mexico", label: "Mexico" },
        ]}
        secondName='state'
        secondPlaceholder='Select State'
        secondOptions={[
          { value: "california", label: "California" },
          { value: "texas", label: "Texas" },
          { value: "newyork", label: "New York" },
        ]}
        rules={{ required: "국가는 필수 항목입니다." }}
        secondRules={{ required: "주/도는 필수 항목입니다." }}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};
```

### Props

- `name`: 첫 번째 선택 박스의 이름 (필수)
- `label`: 선택 박스의 라벨 (선택)
- `layout`: 레이아웃 옵션 (`1col` 또는 `2cols`) (필수)
- `placeholder`: 첫 번째 선택 박스의 placeholder (선택)
- `options`: 첫 번째 선택 박스의 옵션 배열 (필수)
- `control`: `react-hook-form`의 control 객체 (필수)
- `rules`: 첫 번째 선택 박스의 유효성 검사 규칙 (선택)
- `secondName`: 두 번째 선택 박스의 이름 (선택)
- `secondPlaceholder`: 두 번째 선택 박스의 placeholder (선택)
- `secondOptions`: 두 번째 선택 박스의 옵션 배열 (선택)
- `secondRules`: 두 번째 선택 박스의 유효성 검사 규칙 (선택)

## 스타일

이 컴포넌트들은 기본적으로 Tailwind CSS를 사용하여 스타일링되어 있습니다. 필요에 따라 스타일을 커스터마이징할 수 있습니다.

### ETC

본문은 GPT 4o를 활용하여 작성하였습니다.
