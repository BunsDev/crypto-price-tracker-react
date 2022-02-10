import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function index({ marketCoin }) {
  const {
    id,
    name,
    symbol,
    image,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    market_cap,
  } = marketCoin;
  const navigation = useNavigation();
  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${Math.floor(marketCap / 1e12)} T`;
    }
    if (marketCap > 1e9) {
      return `${Math.floor(marketCap / 1e9)} B`;
    }
    if (marketCap > 1e6) {
      return `${Math.floor(marketCap / 1e6)} M`;
    }
    if (marketCap > 1e3) {
      return `${Math.floor(marketCap / 1e3)} K`;
    }
    return marketCap;
  };

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate("CoinDetail", { coinId: id })}
    >
      <Image
        source={{
          uri: image,
        }}
        style={styles.icon}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.dataContainer}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.ticket}>{symbol}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.lastColumn}>
        <Text style={styles.price}>{current_price}</Text>
        <Text style={styles.mcap}>MCap {normalizeMarketCap(market_cap)}</Text>
      </View>
    </Pressable>
  );
}
