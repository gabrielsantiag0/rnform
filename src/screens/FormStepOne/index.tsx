import { useRef } from "react";
import { Text, TextInput, View } from "react-native";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useAccountForm } from "../../hooks/useAccountForm";

import { styles } from "./styles";

import { Progress } from "../components/Progress";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AccountProps } from "../../context/AccountFormContext";

export function FormStepOne(){
    const { updateFormData } = useAccountForm();
    const { navigate } = useNavigation();
    const {control, handleSubmit, formState: { errors } } = useForm<AccountProps>();

    function handleNextStep(data: AccountProps){
        updateFormData(data)
        navigate("formStepTwo");
    }

    const emailRef = useRef<TextInput>(null)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Criar sua conta 
            </Text>

            <Input
             icon="user"
             error={errors.name?.message}
             formProps={{
                 control,
                name: "name",
                rules: {
                    required: "Nome é obrigatório "
                }
             }}
             inputProps={{
                placeholder: "Nome:",
                onSubmitEditing: () => emailRef.current?.focus(),
                returnKeyType: "next"
            }}
            />

            <Input
            error={errors.email?.message}
            ref={emailRef}
             icon="mail"
             formProps={{
                 control,
                name: "email",
                rules: {
                    required: "E-Mail é obrigatório",
                    pattern: {
                        value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
                        message: "E-mail inválido."
                    }
                }
             }}
             inputProps={{
                placeholder: "E-Mail:",
                onSubmitEditing: handleSubmit(handleNextStep),
            }}
            />
            <Button title="Continuar"onPress={handleSubmit(handleNextStep)}/>
            <Progress progress={30}/>
        </View>
    )
}