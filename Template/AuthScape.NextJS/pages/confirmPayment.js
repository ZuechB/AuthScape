import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {apiService} from 'authscape';

export default function ConfirmPayment() {
  
  const router = useRouter();
  const confirmPaymentMethod = async () => {
    if (router.query.redirect_status == "succeeded")
    {
        let syncPaymentMethod = await apiService().post("/Payment/SyncPaymentMethod");
        if (syncPaymentMethod != null && syncPaymentMethod.status == 200)
        {
          window.location.href = decodeURIComponent(router.query.redirectUrl);
        }
        else
        {
          window.location.href = "/";
        }
    }
  }

  useEffect(() => {

    if (router.isReady)
    {
      confirmPaymentMethod();
    }

  }, [router.isReady])

  return (
    <div>
      <h4>Please wait loading...</h4>
    </div>
  );
}