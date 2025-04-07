import React, { useState } from "react";
import { createBottomTabNavigator, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import {View,Text,FlatList,StyleSheet,TouchableOpacity,TextInput,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const DashboardScreen = ({navigation,expenses,budget,}: 
  {navigation: any;
  expenses: { id: string; name: string; amount: number; date: string; category: string }[];
  budget: number;
}) => {
  const totalSpent = expenses.reduce((acc, item) => acc + item.amount, 0);
  const percentage = Math.min((totalSpent / budget) * 100, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello, Rudra </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Spent</Text>
        <Text style={styles.amount}>${totalSpent.toFixed(2)}</Text>
        <View style={styles.progressBackground}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.budgetLabel}>Budget: ${budget}</Text>
      </View>
      <Text style={styles.sectionTitle}>Recent Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={{ fontWeight: "600" }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: "#666" }}>{item.category}</Text>
            </View>
            <Text style={{ fontWeight: "600" }}>${item.amount}</Text>
          </View>
        )}
        style={{ marginTop: 10 }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add")}
      >
        <Ionicons name="add" size={28} color="white" />
        <Text style={{ color: "white", fontWeight: "600", marginLeft: 8 }}>
          Add Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const AddExpenseScreen = ({ onAdd }: any) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!name || !amount || !date || !category) return alert("Please fill in all fields");
    onAdd({ name, amount: parseFloat(amount), date, category });
    alert("Expense saved!");
    setName("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Add Expense</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Groceries" />

      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="e.g. 20" keyboardType="numeric" />

      <Text style={styles.label}>Date</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="e.g. Food, Travel" />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Save Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const HistoryScreen = ({
  expenses,
}: {
  expenses: { id: string; name: string; amount: number; date: string; category: string }[];
}) => {
  const [filterDate, setFilterDate] = useState("");

  const filteredExpenses = filterDate
    ? expenses.filter((e) => e.date === filterDate)
    : expenses;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Expense History</Text>

      <TextInput
        style={styles.input}
        placeholder="Filter by date (YYYY-MM-DD)"
        value={filterDate}
        onChangeText={setFilterDate}
      />

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={{ fontWeight: "600" }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: "#666" }}>{item.category} | {item.date}</Text>
            </View>
            <Text style={{ fontWeight: "600" }}>${item.amount}</Text>
          </View>
        )}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

const BudgetScreen = ({
  budget,
  setBudget,
  expenses,
}:
{
  budget: number;
  setBudget: (value: number) => void;
  expenses: { id: string; name: string; amount: number; date: string; category: string }[];
}) => {
  const [newBudget, setNewBudget] = useState(budget.toString());
  const totalSpent = expenses.reduce((acc, item) => acc + item.amount, 0);
  const remaining = budget - totalSpent;
  const percentageUsed = Math.min((totalSpent / budget) * 100, 100);

  const handleUpdate = () => {
    const value = parseFloat(newBudget);
    if (!isNaN(value) && value >= 0) {
      setBudget(value);
    } else {
      alert("Enter a valid budget amount.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Monthly Budget</Text>

      <View style={styles.budgetCard}>
        <Text style={styles.budgetCardTitle}>Total Budget</Text>
        <Text style={styles.budgetAmount}>${budget}</Text>
        <Text style={styles.budgetSubtext}>Spent: ${totalSpent.toFixed(2)}</Text>
        <Text style={styles.budgetSubtext}>Remaining: ${remaining.toFixed(2)}</Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${percentageUsed}%`,
                backgroundColor:
                  percentageUsed > 90 ? "#dc3545" : percentageUsed > 70 ? "#ffc107" : "#28a745",
              },
            ]}
          />
        </View>
      </View>

      <Text style={[styles.label, { marginTop: 30 }]}>Update Budget</Text>
      <TextInput
        style={styles.input}
        value={newBudget}
        onChangeText={setNewBudget}
        keyboardType="numeric"
        placeholder="Enter new budget"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Update Budget</Text>
      </TouchableOpacity>
    </View>
  );
};


const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    alert(`Dark Mode ${!darkMode ? "Enabled" : "Disabled"}`);
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>

      <View style={styles.settingCard}>
        <Text style={styles.label}>Dark Mode</Text>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {darkMode ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.label}>Language</Text>
        <Text style={{ color: "#888", marginTop: 5 }}>Coming soon...</Text>
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.label}>Currency</Text>
        <Text style={{ color: "#888", marginTop: 5 }}>Coming soon...</Text>
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const [name, setName] = useState("Rudra Patel");
  const [email, setEmail] = useState("rudraptl04@gmail.com");

  const handleLogout = () => {
    alert("You have been logged out!");
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.avatar}></Text>
        <Text style={styles.profileTitle}>Your Profile</Text>
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <TouchableOpacity style={[styles.submitButton, { backgroundColor: "#dc3545" }]} onPress={handleLogout}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};


const screenOptions = ({ route }: { route: { name: string } }): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarIcon: ({ color, size }: { color: string; size: number }) => {
    let iconName: "home" | "add-circle" | "time" | "wallet" | "settings" | "person" = "home";
    switch (route.name) {
      case "Home": iconName = "home"; break;
      case "Add": iconName = "add-circle"; break;
      case "History": iconName = "time"; break;
      case "Budget": iconName = "wallet"; break;
      case "Settings": iconName = "settings"; break;
      case "Profile": iconName = "person"; break;
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

// Main App Component
const Landing = () => {
  const [expenses, setExpenses] = useState([
    { id: "1", name: "Groceries", amount: 120, date: "2024-04-01", category: "Food" },
    { id: "2", name: "Transport", amount: 60, date: "2024-04-02", category: "Travel" },
  ]);
  const [budget, setBudget] = useState(1000);

  const addExpense = (expense: { name: string; amount: number; date: string; category: string }) => {
    const newExpense = { ...expense, id: Math.random().toString() };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const DashboardWithProps = (props: any) => (
    <DashboardScreen {...props} expenses={expenses} budget={budget} />
  );
  const AddWithProps = (props: any) => <AddExpenseScreen {...props} onAdd={addExpense} />;
  const HistoryWithProps = (props: any) => <HistoryScreen {...props} expenses={expenses} />;
  const BudgetWithProps = (props: any) => (
    <BudgetScreen {...props} budget={budget} setBudget={setBudget} expenses={expenses} />
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={DashboardWithProps} />
      <Tab.Screen name="Add" component={AddWithProps} />
      <Tab.Screen name="History" component={HistoryWithProps} />
      <Tab.Screen name="Budget" component={BudgetWithProps} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingTop: 90,
    flex: 1,
  },
  screen: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  welcome: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    padding: 16,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  progressBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  budgetLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#777",
  },
  sectionTitle: {
    paddingBottom: 20,
    fontSize: 25,
    fontWeight: "600",
  },
  expenseItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  budgetCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  budgetCardTitle: {
    fontSize: 16,
    color: "#777",
    fontWeight: "500",
    marginBottom: 6,
  },
  budgetAmount: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  budgetSubtext: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    fontSize: 64,
    marginBottom: 10,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  settingCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },

});

export default Landing;
