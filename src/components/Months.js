import { Button } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

const months = [
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
];

const Months = () => {
  return (
    <ScrollView horizontal>
      {months.map((item, index) => (
        <Button
          key={index + 1}
          style={{
            margin: 5,
          }}
        >
          {item}
        </Button>
      ))}
    </ScrollView>
  );
};

export default Months;
