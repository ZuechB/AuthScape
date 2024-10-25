import React, { useState, useRef, useEffect } from "react";

export const StripeConnect = async () => {

    let baseUrl = GetBaseUrl();
    let response = await apiService().get("/Payment/SetupStripeConnect?returnBaseUrl=" + baseUrl);
    return response;
    
}