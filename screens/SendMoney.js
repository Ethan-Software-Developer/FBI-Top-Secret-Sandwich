import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// Sample currency data and conversion rates
const currencyData = [
  { label: 'South African Rand', value: 'ZAR', symbol: 'R' },
  { label: 'US Dollar', value: 'USD', symbol: '$' },
  { label: 'Euro', value: 'EUR', symbol: '€' },
  { label: 'British Pound', value: 'GBP', symbol: '£' },
  { label: 'Australian Dollar', value: 'AUD', symbol: 'A$' },
  { label: 'Canadian Dollar', value: 'CAD', symbol: 'C$' },
];

const conversionRates = {
  ZAR: { USD: 0.055, EUR: 0.051, GBP: 0.045, AUD: 0.083, CAD: 0.073, ZAR: 1 },
  USD: { ZAR: 18.20, EUR: 0.92, GBP: 0.81, AUD: 1.51, CAD: 1.33, USD: 1 },
  EUR: { ZAR: 19.61, USD: 1.09, GBP: 0.88, AUD: 1.64, CAD: 1.44, EUR: 1 },
  GBP: { ZAR: 22.22, USD: 1.24, EUR: 1.14, AUD: 1.86, CAD: 1.64, GBP: 1 },
  AUD: { ZAR: 12.04, USD: 0.66, EUR: 0.61, GBP: 0.54, CAD: 0.88, AUD: 1 },
  CAD: { ZAR: 13.69, USD: 0.75, EUR: 0.69, GBP: 0.61, AUD: 1.14, CAD: 1 },
};

// Utility to format large numbers with suffixes
const formatWithSuffix = (amount) => {
  if (amount >= 1_000_000_000_000_000) return (amount / 1_000_000_000_000_000).toFixed(1) + 'Q';
  if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(1) + 'B';
  if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(1) + 'M';
  if (amount >= 1_000) return (amount / 1_000).toFixed(1) + 'K';
  return amount.toFixed(2);
};

const SendMoney = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('R0.00');
  const [fromCurrency, setFromCurrency] = useState('ZAR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromSymbol, setFromSymbol] = useState('R');
  const [toSymbol, setToSymbol] = useState('$');
  const [errors, setErrors] = useState({});
  const [amountWarning, setAmountWarning] = useState('');

  useEffect(() => {
    handleConversion();
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleConversion = () => {
    if (fromAmount && !isNaN(fromAmount) && conversionRates[fromCurrency][toCurrency]) {
      const convertedValue = parseFloat(fromAmount) * conversionRates[fromCurrency][toCurrency];
      setConvertedAmount(`${toSymbol}${formatWithSuffix(convertedValue)}`);
    } else {
      setConvertedAmount(`${toSymbol}0.00`);
    }

    const fromCurrencyObj = currencyData.find(item => item.value === fromCurrency);
    const toCurrencyObj = currencyData.find(item => item.value === toCurrency);
    setFromSymbol(fromCurrencyObj ? fromCurrencyObj.symbol : 'R');
    setToSymbol(toCurrencyObj ? toCurrencyObj.symbol : '$');
  };

  const handleAmountChange = (text) => {
    const sanitizedText = text.replace(/[^0-9]/g, ''); // Only allow numbers
    const amount = parseFloat(sanitizedText) || 0;

    // Calculate the max allowed value in the selected currency (5000 ZAR converted)
    const maxAmountInSelectedCurrency = 5000 / conversionRates[fromCurrency]['ZAR']; // Max R5000 divided by the exchange rate
    const maxAmountFormatted = formatWithSuffix(maxAmountInSelectedCurrency);

    // Limit amount if it exceeds the max allowed value
    if (amount <= maxAmountInSelectedCurrency && sanitizedText.length <= 15) { 
      setFromAmount(sanitizedText);
      setAmountWarning('');
      setErrors(prevErrors => ({ ...prevErrors, fromAmount: null }));
    } else if (amount > maxAmountInSelectedCurrency) {
      setErrors(prevErrors => ({ ...prevErrors, fromAmount: `Cannot exceed ${fromSymbol}${maxAmountFormatted}` }));
      setAmountWarning(`Can't exceed ${fromSymbol}${maxAmountFormatted}`);
    }
  };

  // Reset amount when either currency is changed
  const handleCurrencyChange = (field, value) => {
    if (field === 'fromCurrency') {
      setFromCurrency(value);
      setFromAmount(''); // Reset amount when the fromCurrency is changed
    } else if (field === 'toCurrency') {
      setToCurrency(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Send Money</Text>
        <Text
          style={styles.convertedAmount}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Converted: {convertedAmount}
        </Text>
      </View>

      <View style={styles.inputBlock}>
        <TextInput
          style={[styles.input, errors.accountNumber && styles.inputError]}
          placeholder={errors.accountNumber || "Enter account number"}
          placeholderTextColor={errors.accountNumber ? '#ff9800' : '#ccc'}
          value={accountNumber}
          onChangeText={text => setAccountNumber(text)}
          textAlign="left"
        />
      </View>

      <View style={styles.inputBlock}>
        <TextInput
          style={[
            styles.input,
            errors.fromAmount && styles.inputError
          ]}
          placeholder={errors.fromAmount || "Enter amount"}
          placeholderTextColor={errors.fromAmount ? '#ff9800' : '#ccc'}
          keyboardType="numeric"
          value={fromAmount}
          onChangeText={handleAmountChange}
          textAlign="left"
          numberOfLines={1}
          adjustsFontSizeToFit
        />
        {amountWarning ? <Text style={styles.warningText}>{amountWarning}</Text> : null}
      </View>

      <View style={styles.currencyBlock}>
        <Dropdown
          style={styles.dropdown}
          data={currencyData}
          labelField="label"
          valueField="value"
          value={fromCurrency}
          placeholder="From Currency"
          onChange={item => handleCurrencyChange('fromCurrency', item.value)}
        />
      </View>

      <View style={styles.currencyBlock}>
        <Dropdown
          style={styles.dropdown}
          data={currencyData}
          labelField="label"
          valueField="value"
          value={toCurrency}
          placeholder="To Currency"
          onChange={item => handleCurrencyChange('toCurrency', item.value)}
        />
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Send Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  convertedAmount: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    color: '#ff5722',
  },
  inputBlock: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff5722',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff9800',
  },
  warningText: {
    color: '#ff9800',
    fontSize: 14,
    marginTop: 5,
  },
  currencyBlock: {
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ff5722',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: '#ff5722',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SendMoney;
