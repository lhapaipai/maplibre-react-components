"use client";

import { Button } from "pentatrion-design/button";
import { Input } from "pentatrion-design/input";
import { useCopyToClipboard } from "~/hooks/useCopyToClipboard";

const text = "npm i maplibre-react-components";

export default function NpmInput() {
  const [copiedText, copy] = useCopyToClipboard();

  function handleClickCopy() {
    copy(text);
  }
  return (
    <Input
      value={text}
      className="bg-gray-0"
      readOnly
      suffix={
        <>
          {copiedText === text && <span>copied</span>}
          <Button
            onClick={handleClickCopy}
            withRipple={false}
            icon
            variant="text"
            color="gray"
          >
            <i className="fe-copy"></i>
          </Button>
        </>
      }
    />
  );
}
