{questionVisible &&
  <View>
    <Text>What is the question?</Text>
    <Text onPress={() => this.flipCard()}>Show Answer</Text>
  </View>
}

{questionVisible === false &&
  <View>
    <Text>This is the answer!</Text>
    <Text onPress={() => this.flipCard()}>Show Question</Text>
  </View>
}
