import { atom, useAtom, useSetAtom } from 'jotai';

type ConfirmAtomType = {
  /** モーダルタイトル */
  title: string;
  /** 説明文が必要な場合設定可能 */
  body?: string;
  /** 送信ボタンのラベル上書き（デフォルト： "実行"） */
  submitLabel?: string;
  /** 送信ボタン押下時関数 */
  onSubmit?: () => Promise<void>;
  /** キャンセルボタンのラベル上書き（デフォルト： "キャンセル"） */
  cancelLabel?: string;
  /** キャンセルボタン押下時関数 */
  onCancel?: () => Promise<void>;
};

const confirmAtom = atom<ConfirmAtomType>({
  title: '',
});

/** こちらは使用しない */
export const useConfirmAtom = () => useAtom(confirmAtom);

/** 実行確認モーダル用関数 */
export const useSetConfirmModal = () => useSetAtom(confirmAtom);
