import React, { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNamespace } from "./TranslationWrapper";

export interface TranslationOptions {
  plural?: string;
  vars?: (string | number)[];
}

export type Props<T extends React.ElementType = "div"> = {
  component?: T;
  children: any;
  className?: string;
} & React.ComponentProps<T>;

function Txt<T extends React.ElementType = "div">({
  children,
  component,
  className,
  ...rest
}: Props<T>): ReactElement {
  const namespace = useNamespace();
  const { t } = useTranslation(namespace);

  const translation = <Trans t={t}>{children}</Trans>;

  if (component) {
    const Root = component;
    return (
      <Root {...rest} className={className}>
        {translation}
      </Root>
    );
  } else if (className) {
    return (
      <div {...rest} className={className}>
        {translation}
      </div>
    );
  } else {
    return translation;
  }
}

export default React.memo(Txt);
