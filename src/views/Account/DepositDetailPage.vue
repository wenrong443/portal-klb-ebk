<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{{ $messages.labelDepositDetailPage() }}</h4>
        </div>
        <div class="card-body">
          <cave-detail-component :label="$messages.labelUsername()" :value="cdrtUtUsername" />
          <cave-detail-component :label="$messages.fieldLabelRefNo()" :value="cdrtOrderNo" />
          <cave-detail-component :label="$messages.labelCreatedAt()" :value="cdrtCreatedOn" />
          <cave-detail-component :label="$messages.fieldLabelDepositType()" :value="cdrtCmbtType" />
          <cave-detail-component
            :label="$messages.fieldLabelNetworkType()"
            :value="cdrtCmbtAccountName"
          />
          <cave-detail-component
            :label="$messages.fieldLabelWalletAddress() + '/' + $messages.fieldLabelAccountNo()"
            :value="formattedBankInfo"
          />
          <div class="cave-two-col" v-if="!isEditAmount">
            <cave-detail-component :label="$messages.fieldLabelAmount()" :value="formattedAmount" />
            <button
              class="btn btn-primary btn-round btn-sm m-0"
              @click="showEditAmount"
            >{{ $messages.labelEdit() }}</button>
          </div>
          <div class="form-group cave-form" v-else>
            <div class="cave-form--input-group">
              <label>{{ $messages.fieldLabelAmount() }}</label>
              <div class="cave-two-col">
                <input
                  type="text"
                  class="form-control mr-2"
                  :placeholder="$messages.fieldLabelEnter() + $messages.fieldLabelAmount()"
                  v-model="cdrtAmount"
                />
                <button
                  class="btn btn-primary btn-sm"
                  @click="saveAmount"
                >{{ $messages.labelSave() }}</button>
              </div>
            </div>
          </div>
          <cave-detail-component
            :label="$messages.fieldLabelProcessedBy()"
            :value="cdrtProcessedByUtUsername"
          />
          <cave-detail-component
            :label="$messages.fieldLabelProcessedAt()"
            :value="cdrtProcessedOn"
          />
          <cave-detail-component
            :label="$messages.fieldLabelProcessingFee()"
            :value="cdrtProcessingFee.toString()"
          />
          <cave-detail-component :label="$messages.labelStatus()">
            <span
              class="badge badge-pill"
              v-bind:class="formattedStatusClass"
            >{{ formattedStatusName }}</span>
          </cave-detail-component>
          <cave-detail-component :label="$messages.fieldLabelUserRemarks()" :value="cdrtRemarks" />
          <cave-detail-component
            :label="$messages.fieldLabelAdminRejectReason()"
            :value="cdrtParam4"
          />
        </div>
        <div class="card-footer">
          <button
            type="submit"
            class="btn btn-danger btn-round"
            @click="reject()"
            v-if="canAction && $claims.canRejectDeposit"
          >{{ $messages.labelReject() }}</button>
          <button
            type="submit"
            class="btn btn-info btn-round"
            @click="approve()"
            v-if="canAction && $claims.canApproveDeposit"
          >{{ $messages.labelApprove() }}</button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-body">
          <div class="cave-detail--side-image">
            <label>{{ $messages.fieldLabelImage() }}</label>
            <br />
            <img
              @click="show"
              :src="formattedImageUrl"
              style="height: 500px; width: auto"
              alt="deposit proof url"
            />
          </div>
        </div>
      </div>
    </div>
    <vue-easy-lightbox
      escDisabled
      moveDisabled
      :visible="visible"
      :imgs="formattedImageUrl"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>
<script>
import {
  assignDeposit,
  createDepositInstance,
  STATUS_CLASS,
  RecordMixin as mixin,
} from "./Account";
import CaveDetailComponent from "@components/CaveDetailComponent";
import pageBehaviour from "seedwork/mixins/pageBehaviour";
import json from "@/infrastructure/json/config.json";

export default {
  name: "DepositDetailPage",
  components: { CaveDetailComponent },
  mixins: [pageBehaviour],
  props: {
    recordId: { type: String, require: true },
  },
  data: () => ({
    STATUS: {},
    isEditAmount: false,
    visible: false,
    ...createDepositInstance(),
  }),
  computed: {
    isBankType() {
      return this.cdrtCmbtType.toLowerCase() == "bank"
    },
    formattedStatusClass() {
      return this.cdrtStatus != null ? STATUS_CLASS[this.cdrtStatus] : "";
    },
    formattedStatusName() {
      return this.cdrtStatus != null ? this.STATUS[this.cdrtStatus] : "-";
    },
    canAction() {
      return this.cdrtStatus == 0;
    },
    formattedImageUrl() {
      return this.cdrtPaymentProve1 ? this.cdrtPaymentProve1 : null;
    },
    formattedBankInfo() {
      if (!this.cdrtCmbtAccountNo)
        return "-"

      return !this.isBankType
        ? this.cdrtCmbtAccountNo
        : this.cdrtCmbtAccountNo + "(" + this.cdrtCmbtAccountName + ")"
    },
    formattedAmount() {
      if (!this.cdrtAmount)
        return "-"
      return !this.isBankType
        ? this.cdrtAmount
        : this.cdrtAmount + " (" + this.cdrtParam5 + "" + this.cdrtParam8 + " @ " + this.cdrtParam7 + ")"
    },
  },
  async created() {
    await this.get();
  },
  methods: {
    showEditAmount() {
      this.isEditAmount = !this.isEditAmount;
    },
    async get() {
      this.STATUS = {
        1: this.$messages.fieldLabelApproved(),
        0: this.$messages.fieldLabelPending(),
        "-1": this.$messages.fieldLabelRejected(),
      };

      const [error, result] =
        await this.$service.accountService.getDeposit(this.recordId);

      if (error) {
        this.showError(error);
      } else {
        assignDeposit(this, result.content);
      }
    },
    async approve() {
      const value = await this.$swal({
        title: this.$messages.labelAreYouSure(),
        text: this.$messages.labelYourWontBeAbleToRevertThis(),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$messages.fieldLabelYes(),
        cancelButtonText: this.$messages.fieldLabelNo(),
      }).then((value) => {
        return value;
      });
      if (value.isConfirmed) {
        this.setLoading();
        const [error, result] =
          await this.$service.accountService.approveDeposit(
            this.recordId
          );
        if (error) {
          this.showError(error);
        } else {
          this.setCompleted();
          this.$swal("Approved!", "You approved!", "success");
          this.$parent.dismissQuickView();

        //   this.$emit("refresh");
        }
      }
    },
    async reject() {
      const { value } = await this.$swal({
        title: this.$messages.labelAreYouSure(),
        text: this.$messages.labelYourWontBeAbleToRevertThis(),
        input: "radio",
        inputOptions: json.depositRejectReasons,
        inputValidator: async (value) => {
          if (!value) {
            return "You need to choose something!";
          }
          this.setLoading();
          const [error, result] =
            await this.$service.accountService.rejectDeposit2(
              this.recordId,
              value
            );
          if (error) {
            this.showError(error);
          } else {
            this.setCompleted();
            this.$swal("Rejected!", "You rejected!", "success");
                        this.$parent.dismissQuickView();

            // this.$emit("refresh");
          }
        },
      });
    },
    async saveAmount() {
      const record = {
        amount: this.cdrtAmount,
      };
      const [error, result] =
        await this.$service.accountService.updateAmount(
          this.cdrtId,
          record
        );
      if (error) {
        this.showError(error);
      } else {
        this.showEditAmount();
        this.get();
      }
    },
    show() {
      this.visible = true
    },
    handleHide() {
      this.visible = false
    }
  },
};
</script>
<style lang="scss" scoped>
.cave-two-col {
  display: grid;
  grid-template-columns: auto auto;
  gap: 8px;
}
</style>