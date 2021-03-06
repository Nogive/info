import vueNcform from "@ncform/ncform";
import mmInput from "./components/mmInput";
import mmNumber from "./components/mmNumber";
import mmTextarea from "./components/mmTextarea";
import mmRadio from "./components/mmRadio";
import mmSelect from "./components/mmSelect";
import mmDatePicker from "./components/mmDatePicker";
import mmPhoto from "./components/mmPhoto";
import mmLocation from "./components/mmLocation";
import mmObject from "./components/mmObject";
import mmArray from "./components/mmArray";
import mmArea from "./components/mmArea";
import mmForeignObject from "./components/mmForeignObject";
import mmQuickArray from "./components/mmQuickArray";
import mmSimpleArray from "./components/mmSimpleArray";

Vue.use(vueNcform, {
  extComponents: {
    mmInput,
    mmNumber,
    mmTextarea,
    mmRadio,
    mmSelect,
    mmDatePicker,
    mmPhoto,
    mmLocation,
    mmObject,
    mmArray,
    mmArea,
    mmForeignObject,
    mmQuickArray,
    mmSimpleArray
  }
});
