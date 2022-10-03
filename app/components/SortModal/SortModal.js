import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import SortItem from "./SortItem";
function SortModal({
  isVisible,
  setIsVisible,
  activeChoice,
  setActiveChoice,
  choices,
}) {
  const onSelect = (choice) => {
    setActiveChoice(choice);
  };

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.3}>
      <View style={styles.modal__container}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.header__text}>Sort by</Text>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={styles.close__icon}
            >
              <Icon name="close" size={23} />
            </TouchableOpacity>
          </View>
          <View style={styles.content__container}>
            {choices.map((item, index) => {
              return (
                <SortItem
                  key={index.toString()}
                  name={item.name}
                  value={item.value}
                  checked={
                    activeChoice === item.value ? "checked" : "unchecked"
                  }
                  onSelect={() => onSelect(item.value)}
                />
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default SortModal;
