import { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useForm } from "react-hook-form";
import { useAccountForm } from "../../hooks/useAccountForm";
import { AccountProps } from "../../context/AccountFormContext";

import { styles } from "./styles";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Progress } from "../components/Progress";


export function FormStepTwo(){
    const { navigate } = useNavigation();
    const { updateFormData } = useAccountForm();
    const {control, handleSubmit, formState: { errors } } = useForm<AccountProps>();

    function handleNextStep(data: AccountProps){
        updateFormData(data);
        navigate("formStepThree");
    }

    const phoneRef = useRef<TextInput>(null)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Suas Informações  
            </Text>

            <Input
             icon="calendar"
             error={errors.birth?.message}
             formProps={{
                control,
                name: "birth",
                rules: {
                    required: "Data de nascimento é obrigatória.",
                    pattern: {
                        value:/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                        message: "Data de nascimento inválida."
                    }
                }
             }}
             inputProps={{
                placeholder: "Data de Nascimento",
                onSubmitEditing: () => phoneRef.current?.focus(),
                returnKeyType: "next"
            }}
            />

            <Input
            error={errors.phone?.message}
            ref={phoneRef}
             icon="phone"
             formProps={{
                 control,
                name: "phone",
                rules: {
                    required: "Telefone é obrigatório",
                   pattern: {
                    value: /^\d{2} 9\d{4}-\d{4}$/,
                    message: "Telefone inválido."
                   } 
                }
             }}
             inputProps={{
                placeholder: "Telefone:",
                onSubmitEditing: handleSubmit(handleNextStep),
            }}
            />
            <Button title="Continuar"onPress={handleSubmit(handleNextStep)}/>
            <Progress progress={60}/>
            </View>
    )
}