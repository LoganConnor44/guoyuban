import React from "react";
import figlet from "figlet";
import { Text } from "ink";

type AsciiProps = {
  font?: figlet.Fonts;
  theme?: string;
  horizontalLayout?: figlet.KerningMethods;
  verticalLayout?: figlet.KerningMethods;
  text?: string;
};

const Ascii = ({
  font = "Slant Relief",
  horizontalLayout = "default",
  verticalLayout = "default",
  text = "",
}: AsciiProps) => {
  return (
    <Text>
      {figlet.textSync(text, {
        font,
        horizontalLayout,
        verticalLayout,
      })}
    </Text>
  );
};

export default Ascii;